import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { environment } from '../../environments/environment'


@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  public blogpostList$: Observable<Blogpost[]>;
  public imagePath  = environment.imagePath;

  constructor(private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogpostList$ =  this.blogpostService.getBlogpost();
  }

}
