import { Component, OnInit, ElementRef } from '@angular/core';
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

  constructor(private fb: FormBuilder,
              private blogpostService: BlogpostService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.creationForm = this.fb.group({
      title: '',
      subTitle: '',
      content: '',
      image: ''
    })
  }

  public uploadImage() {
    // Retrieve upload file
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#blogImage');
    let fileCount: number = inputEl.files.length;
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append('blogImage', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData)
        .subscribe(data => console.log('data image ', data), error => console.error(error));
    }
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
    this.blogpostService.dispatchBlogpostCreated(blogpost._id);
  }

  private handleError(error: Error): void {
    console.error('Blog post creation is failed', error);
  }

}
