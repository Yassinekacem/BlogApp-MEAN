import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:2000/api/posts';
  likesUrl: string = 'http://localhost:2000/api/likes'; // URL dédiée aux likes


  deletePost(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addPost(post: FormData) {
    return this.http.post(`${this.apiUrl}/add`, post);
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/all`);
  }

  getPostsByUser(userId: string) {
    return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPostById(postId: string) {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: string, post: FormData) {
    return this.http.put(`${this.apiUrl}/${postId}`, post);
  }  

    // Récupérer les likes pour un post spécifique
    getLikes(postId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${postId}/likes`);
    }
 
    getComments(postId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${postId}/comments`);
    } 

    addLike(userId: string, postId: string): Observable<any> {
      const body = { userId, postId };
      return this.http.post(`${this.likesUrl}/add`, body); 
    }
    checkLikeStatus(postId: string, userId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${postId}/liked-by/${userId}`);
    }  
    deleteLike(likeId: string): Observable<any> {
      return this.http.delete(`${this.likesUrl}/${likeId}`);
    } 

    // Récupérer l'ID du like pour suppression
getLikeId(postId: string, userId: string): Observable<any> {
  const url = `${this.apiUrl}/${postId}/like-id/${userId}`;
  return this.http.get<any>(url);
}

    
    
    

  

}
