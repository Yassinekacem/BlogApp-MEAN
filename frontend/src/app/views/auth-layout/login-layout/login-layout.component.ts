import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
})
export class LoginLayoutComponent {

  user: any = {};
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { 

  this.loginForm = new FormGroup({
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    password: new FormControl(this.user.password, [Validators.required]),
  });

}

  
  loginUser() {
    this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response) => {
        console.log(response);
        // localStorage.setItem('userId', response.userId);
        // localStorage.setItem('userPhoto', response.userPhoto);

        const token = response.token;
        const role = response.role;

        if (token) {
          // Stockage sécurisé du cookie
          const cookieExpirationDays = 7;
          this.cookieService.set(
            'token',
            token,
            cookieExpirationDays,
            '/',
            '',
            true,
            'Strict'
          );
          this.cookieService.set(
            'role',
            role,
            cookieExpirationDays,
            '/',
            '',
            true,
            'Strict'
          );

          alert('Bienvenue');
          // Vérifiez le token avant de naviguer
          if (this.userService.isTokenValid(token)) {
            this.router.navigate(['/home']);
          } else {
            alert('Token invalide, veuillez réessayer.');
          }
        } else {
          alert('Token manquant dans la réponse.');
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }
}
