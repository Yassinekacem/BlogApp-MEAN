import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestModel } from '../models/Request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  apiUrl: string = 'http://localhost:2000/api/invitations';

  getInvitations(id:string){
    return this.http.get<RequestModel[]>(`${this.apiUrl}/receiver/${id}`);
  }

  acceptRequest(id:string){
    return this.http.put(`${this.apiUrl}/accept/${id}`,null);
  }

  refuseRequest(id:string){
    return this.http.put(`${this.apiUrl}/reject/${id}`,null);
  }

  sendRequest(senderId:string, receiverId:string){
    return this.http.post(`${this.apiUrl}/add`, {senderId, receiverId});
  }

  getRequestBySenderAndReciver(senderId:string, receiverId:string){
    return this.http.get(`${this.apiUrl}/${senderId}/${receiverId}`)
  }

  deleteRequest(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
