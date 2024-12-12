import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/User.model';
import { Post } from '../../../models/Post.model';
import { PostService } from '../../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModelComponent } from '../../../layouts/delete-model/delete-model.component';
import { RequestService } from '../../../services/request.service';
import { RequestModel } from '../../../models/Request.model';

@Component({
  selector: 'app-view-profil',
  templateUrl: './view-profil.component.html',
  styleUrl: './view-profil.component.scss',
})
export class ViewProfilComponent implements OnInit {
  id: any;
  user: UserModel | undefined;
  postsUser: Post[] = [];
  postNumber: any;
  requestStatus: string | undefined;
  Recivedrequest: any | undefined;
  Sendedrequest: any | undefined;
  isTheSender: boolean = false;
  isTheReciver: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private postService: PostService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = params['id']));
    this.auth.getUserById(this.id).subscribe(
      (res) => {
        this.user = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.postService.getPostsByUser(this.id).subscribe(
      (res) => {
        this.postsUser = res;
        this.postNumber = this.postsUser.length;
      },
      (err) => {
        console.log(err);
      }
    );

    this.requestService
    .getRequestBySenderAndReciver(this.auth.getDataFromToken().id, this.id)
    .subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.Recivedrequest = data[0]; 
          this.requestStatus = this.Recivedrequest.status;
        }
      },
      error: (err) => {
        console.error('Error fetching request:', err);
      },
  });

  this.requestService
    .getRequestBySenderAndReciver( this.id,this.auth.getDataFromToken().id)
    .subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.Sendedrequest = data[0]; 
          this.requestStatus = this.Sendedrequest.status;
        } else {
          console.log('No matching request found.');
        }
       
      },
      error: (err) => {
        console.error('Error fetching request:', err);
      },
  });
  }

  currentUser() {
    if (this.id == this.auth.getDataFromToken().id) return true;
    return false;
  }

  deletePost(postToDelete: Post) {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      width: '450px',
      data: {
        title: 'Delete Post',
        description: `This action will permanently delete '${postToDelete.title}' Post, Are you sure you want to proceed this action ?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.postService.deletePost(postToDelete._id).subscribe({
          next: (res) => {
            this.openSnackBar(
              this.snackbar,
              'Post deleted successfully',
              'app-notification-success'
            );
            this.postsUser = this.postsUser.filter(
              (item) => item._id !== postToDelete._id
            );
            // this.filteredPosts = this.filteredPosts.filter(
            //   (item) =>
            //     item._id !== postToDelete._id
            // );
          },
          error: (err) => {
            this.openSnackBar(
              this.snackbar,
              'Error deleting scenario',
              'app-notification-error'
            );
          },
        });
      }
    });
  }

  openSnackBar(snackbar: MatSnackBar, mainText: string, color: string) {
    snackbar.open(mainText, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
      panelClass: [color, 'custom-snackbar'],
    });
  }

  isAuthor(post: Post): boolean {
    return this.auth.getDataFromToken().id === post.userId._id;
  }

  sendRequest() {
    this.requestService
      .sendRequest(this.auth.getDataFromToken().id, this.id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  delete(){

    let idRequest: string;
    if (this.Recivedrequest !== undefined) {
       idRequest = this.Recivedrequest._id;
    }else{
       idRequest = this.Sendedrequest._id;  
    }

    this.requestService.deleteRequest(idRequest).subscribe({
      next: (data) => {
        console.log('Request deleted successfully');
        this.requestStatus = undefined;
      },
      error: (err) => {
        console.error('Error deleting request:', err);
      },
    }); 
  }
}
