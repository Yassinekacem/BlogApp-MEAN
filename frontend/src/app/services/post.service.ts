import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  
  constructor(private http:HttpClient) { }
  
  apiUrl : string = 'http://localhost:2000/api/posts';
  
  deletePost(id: string) {
   return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
 addPost(post : FormData){
    return this.http.post(`${this.apiUrl}/add`,post);
 }

 getAllPosts(){
   return this.http.get<Post[]>(`${this.apiUrl}/all`);
 }

 getPostsByUser(userId : string){
   return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
 }

  getPostById(postId : string){
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }
  
}
