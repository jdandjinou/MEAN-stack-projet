import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  public blogpost$: Observable<Blogpost>
  public imagePath = environment.imagePath;

  constructor(private activateRoute: ActivatedRoute, private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.blogpost$ = this.blogpostService.getBlogpostById(id);
  }

}
