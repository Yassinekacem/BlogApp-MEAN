import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl: string = 'http://localhost:2000/api/comments';

  constructor(private http: HttpClient) {}

  // Récupérer tous les commentaires d'un post
  getCommentsByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/post/${postId}`);
  }

  // Ajouter un commentaire
  addComment(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  } 
// Supprimer un commentaire
deleteComment(commentId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${commentId}`);
}

updateComment(commentId: string, updatedContent: { content: string }): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${commentId}`, updatedContent);
}


}