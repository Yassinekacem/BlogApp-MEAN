import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { UserModel } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = 'http://localhost:2000/api/users';

  constructor(private http:HttpClient,private cookieService: CookieService) { }


  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: {
        'Content-Type': 'application/json'  // Ajoutez ce header si l'API attend du JSON
      }
    });
 
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login-user`;
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


  isLoggedIn(): boolean {
    if (this.cookieService.get('token'))
      return true
    return false
  }

  logout() {
    this.cookieService.deleteAll();
  }

  getDataFromToken(): any {
    let token = this.cookieService.get('token')
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    const data =  JSON.parse(decodedPayload);
    return data
  }

  getUserById(userId: string):Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}`);
  }


  updateUserById(userId: string, userData: any):Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${userId}`, userData);
  }

  getAllUsers():Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/all`);
  }  

  deleteUser(userId: string):Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.apiUrl}/${userId}`);
  }
}
