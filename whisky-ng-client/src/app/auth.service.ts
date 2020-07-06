import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  public isAuthenticated = false;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<User> {
    this.isAuthenticated = true;
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  public logout() {
    this.isAuthenticated = false;
    return this.http.get(`${this.baseUrl}/logout`)
  }
}
