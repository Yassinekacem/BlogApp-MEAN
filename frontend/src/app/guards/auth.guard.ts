import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService

  ) { }



  canActivate(): boolean {
    //const token = this.cookieService.get('token');
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
