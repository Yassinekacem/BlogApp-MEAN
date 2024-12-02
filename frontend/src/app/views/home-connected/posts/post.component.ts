import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';
import { UserModel } from '../../../models/User.model';
import { DeleteModelComponent } from '../../../layouts/delete-model/delete-model.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  posts : Post[] = [];
  filteredPosts: Post[] = [];


  constructor(private postService:PostService,
              private auth:AuthService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      res=>{
        this.posts = res;
      },
      err=>{
        console.log(err);
      }
  )}

  isAuthor(post: Post): boolean {
    return this.auth.getDataFromToken().id === post.userId._id;
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
        this.postService
          .deletePost(postToDelete._id)
          .subscribe({
            next: (res) => {
              this.openSnackBar(
                this.snackbar,
                'Post deleted successfully',
                'app-notification-success'
              );
              this.posts = this.posts.filter(
                (item) =>
                  item._id !== postToDelete._id
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
      panelClass: [color,'custom-snackbar']
  });
  }


  

}
