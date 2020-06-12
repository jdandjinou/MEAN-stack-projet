import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allBlogposts: Blogpost[];
 // blogposts$: Observable

  constructor(private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogpostService
      .getBlogpost()
      .subscribe(blogposts => {
        this.allBlogposts = blogposts;
      } )
  }

  public deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value)
    if(ids.length === 1) {
      return this.blogpostService
        .deleteSimgleBlogPost(ids[0])
        .subscribe((data) => console.log('data', data),  err => console.error(err));
      
    } else {
      return this.blogpostService
        .deleteBlogPosts(ids)
        .subscribe(data => console.log(data), err => console.error(err));
    }
    
  }

}
