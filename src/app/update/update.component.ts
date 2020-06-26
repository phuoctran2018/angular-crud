import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  postForm: FormGroup;
  post: Post;
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('postId');
    this.crudService.getById(id).subscribe((data)=>{
      this.post = data;
      this.postForm.controls['body'].setValue(data.body);
      this.postForm.controls['id'].setValue(data.id);
    });
    
    this.postForm = this.formBuilder.group({
      id: "",
      body: ""
    });

    
  }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public crudService: CrudService,
    private route:ActivatedRoute
  ){ }
  submitForm() {
    this.crudService.update(this.post.id, this.postForm.value).subscribe(res => {
      this.router.navigateByUrl('/home')})
  }

}
