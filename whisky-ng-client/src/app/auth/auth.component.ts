import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public user: User = {
    username: '',
    password: ''
  }

  public errorFromServer: string = '';
  public loginFailMessage: string = 'Username or password is wrong';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public login() {
    console.log('user test', this.user);
    this.authService.login(this.user)
      .subscribe(data => this.handleSuccess(data), err => this.handleError(err))
  }

  private handleSuccess(data): void {
    console.log('data: ', data);
    this.router.navigate(['/admin']);
  }

  private handleError(err: HttpErrorResponse): void {
    this.errorFromServer = `Error ${err.status} - ${err.statusText}.`;
    console.error('Not logged in', err);
  }
  

}
