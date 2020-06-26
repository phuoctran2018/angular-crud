import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Post[])=>{
      console.log(data);
      this.posts = data;
    })  
  }

}
