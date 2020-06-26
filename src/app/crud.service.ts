import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {  throwError, Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post.model';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiServer + '/posts/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  createComment(comment): Observable<Comment> {
    return this.httpClient.post<Comment>(this.apiServer + '/comments/', JSON.stringify(comment), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Post> {
    return this.httpClient.get<Post>(this.apiServer + '/posts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getComment(): Observable<Comment> {
    return this.httpClient.get<Comment>(this.apiServer + '/comments/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getCommentById(id): Observable<Comment> {
    return this.httpClient.get<Comment>(this.apiServer + '/posts/'+ id + '/comments')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiServer + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiServer + '/posts/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Post>(this.apiServer + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}