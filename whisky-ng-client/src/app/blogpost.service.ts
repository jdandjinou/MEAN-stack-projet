import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Blogpost } from './models/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  public baseUrl = 'http://localhost:3000/api/v1';
  private blogpostCreated = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  public dispatchBlogpostCreated(id: string): void {
    this.blogpostCreated.next(id);
  }

  public handleBlogpostCreated(): Observable<string> {
    return this.blogpostCreated.asObservable();
  }

  public uploadImage(formaData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/blog-posts/images`, formaData);
  }

  public getBlogpost(): Observable<Blogpost[]> {
    return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/blog-posts`);
  }

  public getBlogpostById(id): Observable<Blogpost> {
    return this.httpClient.get<Blogpost>(`${this.baseUrl}/blog-posts/${id}`);
  }

  public deleteSimgleBlogPost(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/${id}`);
  }
  public deleteBlogPosts(ids: string[]): Observable<Object> {
    const allIds = ids.join(','); // Transforme les éléments du tableau en string avec le séparateur
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/?ids=${allIds}`);
  }

  public createBlogpost(blogpost: Blogpost): Observable<Blogpost> {
    return this.httpClient.post<Blogpost>(`${this.baseUrl}/blog-posts`, blogpost)
  }
}
