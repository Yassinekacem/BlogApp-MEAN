import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  apiUrl : string = 'http://localhost:2000/api/likes';

  constructor(private http:HttpClient) { }

  getLikes(postId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count/${postId}`);
  }

  likePost(postId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}`, { userId });
  }

}
