import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }


  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:2000/api/users/register', userData, {
      headers: {
        'Content-Type': 'application/json'  // Ajoutez ce header si l'API attend du JSON
      }
    });
 
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = 'http://localhost:2000/api/users/login-user';
    const body = { email: email, password: password };

    return this.http.post<any>(url, body).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError('Login failed. Please try again.'); // Vous pouvez personnaliser ce message d'erreur
      })
    );
  }

  isAdmin(): boolean {
    const token = this.cookieService.get('role');
    if (token=== 'admin') {
      return true;
    }
    return false;
  }

  isTokenValid(token: string): boolean{
    return !!token;
  }
}
