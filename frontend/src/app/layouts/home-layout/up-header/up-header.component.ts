import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-up-header',
  templateUrl: './up-header.component.html',
  styleUrl: './up-header.component.scss'
})
export class UpHeaderComponent {

  constructor( public _auth:AuthService , private router:Router) { } 

  logOut(){
    this._auth.logout();
    this.router.navigate(['auth/login']);
  }

  notificationCount: number = 5;  // Exemple
  friendRequestCount: number = 2; // Exemple


  notifications = [
    { message: 'New comment on your post' },
    { message: 'New like on your photo' },
    { message: 'You have a meeting at 3 PM' }
  ];

  friendRequests = [
    { name: 'John Doe' },
    { name: 'Jane Smith' }
  ];

}
