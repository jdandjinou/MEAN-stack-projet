import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {
  public creationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  public createBlogPost() {
    if(this.creationForm.valid) {
      console.log(this.creationForm.value);
    }
      
  }

}
