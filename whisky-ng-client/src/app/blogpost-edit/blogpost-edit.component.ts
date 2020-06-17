import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../blogpost.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css']
})
export class BlogpostEditComponent implements OnInit {
  editForm: FormGroup;
  blogpostId: string;
  blogpost: Blogpost;

  constructor(private fb: FormBuilder,
              private blogpostService: BlogpostService,
              private activateRoute: ActivatedRoute,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.blogpostId = this.activateRoute.snapshot.params.get('id');
    this.blogpostService
      .getBlogpostById(this.blogpostId)
      .subscribe(data => this.blogpost = data, error => console.error(error)
    );

    this.createForm();
  }

  private createForm(): void {
    this.fb.group({
      title: '',
      subTitle: '',
      content: '',
      image: ''
    });
  }

  private upload(): void {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if(fileCount > 0) {
      formData.append('image', inputEl.files.item(0));
      this.blogpostService
        .uploadImage(formData)
        .subscribe(data => console.log(data), error => console.error(error));
    }
  }

}
