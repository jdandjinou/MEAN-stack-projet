import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allBlogposts: Blogpost[];
 // blogposts$: Observable<Blogpost[]>

  constructor(private blogpostService: BlogpostService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth'])
    }

    this.blogpostService
      .getBlogpost()
      .subscribe(data => this.refresh(data));

    this.blogpostService
      .handleBlogpostCreated()
      .subscribe(data => {
        console.log('New blog post created with id ', data);
        this.refresh(data);
      })
  }

  public deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value)
    if(ids.length === 1) {
      return this.blogpostService
        .deleteSimgleBlogPost(ids[0])
        .subscribe((data) => this.refresh(data),  err => this.handleError(err));
      
    } else {
      return this.blogpostService
        .deleteBlogPosts(ids)
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
    
  }

  private refresh(data): void {
    console.log('data', data);
    this.blogpostService
      .getBlogpost()
      .subscribe(blogposts => {
        this.allBlogposts = blogposts;
      })
  }

  private handleError(error: Error): void {
    console.error(error);
  }

  public logout(): void {
    this.authService.logout()
      .subscribe(data => {
        console.log(data);
      }, err => console.error(err));
    
    this.router.navigate(['/auth']);
  }
 

}
