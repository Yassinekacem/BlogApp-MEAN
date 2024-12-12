import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Route, Router } from '@angular/router';
import { RequestService } from '../../../services/request.service';
import { RequestModel } from '../../../models/Request.model';
import { UserModel } from '../../../models/User.model';

@Component({
  selector: 'app-up-header',
  templateUrl: './up-header.component.html',
  styleUrl: './up-header.component.scss'
})
export class UpHeaderComponent implements OnInit {

  requests : RequestModel[] = [];
  requestsUsersData : UserModel[] = [];

  notificationCount: number = 0 ;  // Exemple
  friendRequestCount: number = 0 ; 
  
  constructor( public _auth:AuthService , private router:Router, private requestService:RequestService) { } 
  
  ngOnInit(): void {
    
    this.fetchInvitations();

  }

  fetchInvitations() {
    const currentUserId = this._auth.getDataFromToken().id;
  
    this.requestService.getInvitations(currentUserId).subscribe({
      next: (data) => {
        // Filter only pending requests
        const pendingRequests = data.filter((request) => request.status === 'pending');
        
        // Update state
        this.requests = pendingRequests;
        this.friendRequestCount = pendingRequests.length;
        },
      error: (err) => {
        console.error('Erreur lors de la récupération des invitations', err);
      },
    });
  }
  

  

  logOut(){
    this._auth.logout();
    this.router.navigate(['/login']);
  }

   // Exemple


  notifications = [
    { message: 'New comment on your post' },
    { message: 'New like on your photo' },
    { message: 'You have a meeting at 3 PM' }
  ];

  acceptRequest(requestId:string){
    this.requestService.acceptRequest(requestId).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchInvitations();
      },
      error: (err) => {
        console.error('Erreur lors de l\'acceptation de la demande', err);
      }
    });
  }

  refuseRequest(requestId:string){
    this.requestService.refuseRequest(requestId).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchInvitations();
      },
      error: (err) => {
        console.error('Erreur lors du refus de la demande', err);
      }
    });
  }

  

}
