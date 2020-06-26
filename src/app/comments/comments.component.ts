import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Post } from '../post.model';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  postForm: FormGroup;
  post: Post;
  comments: Comment
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('postId');

    this.crudService.getCommentById(id).subscribe((data)=>{
      this.comments = data;
    });
    
    this.postForm = this.formBuilder.group({
      id: "",
      body: "",
      postId: +id
    });

    
  }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private route:ActivatedRoute
  ){ }
  submitForm() {
    this.crudService.createComment(this.postForm.value).subscribe(res => {})
    this.crudService.getCommentById(this.route.snapshot.paramMap.get('postId')).subscribe((data)=>{
      this.comments = data;
    });
  }

}
