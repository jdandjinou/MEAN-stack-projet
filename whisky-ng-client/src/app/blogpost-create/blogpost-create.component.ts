import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {
  public creationForm: FormGroup;

  constructor(private fb: FormBuilder, private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.creationForm = this.fb.group({
      title: '',
      subTitle: '',
      content: ''
    })
  }

  public createBlogPost(formDirective: FormGroupDirective) {
    if(this.creationForm.valid) {
      console.log(this.creationForm.value);
      this.blogpostService
        .createBlogpost(this.creationForm.value)
        .subscribe(data => this.handleSucces(data, formDirective), error => this.handleError(error));
    }
      
  }

  private handleSucces(blogpost: Blogpost, formDirective: FormGroupDirective): void {
    console.log('Blog post is created', blogpost);
    this.creationForm.reset();
    formDirective.resetForm();
  }

  private handleError(error: Error): void {
    console.error('Blog post creation is failed', error);
  }

}
