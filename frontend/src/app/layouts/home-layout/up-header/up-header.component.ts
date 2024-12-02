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

}
