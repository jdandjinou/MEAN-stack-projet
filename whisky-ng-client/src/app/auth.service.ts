import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }
}
