import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

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

  constructor() { }

  ngOnInit(): void {
  }

  public login() {
    
  }

}
