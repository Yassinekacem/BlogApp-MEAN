import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';
import { UserModel } from '../../../models/User.model';
import { DeleteModelComponent } from '../../../layouts/delete-model/delete-model.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from '../../../services/auth.service';
import { LikesService } from '../../../services/likes.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  posts : Post[] = [];
  filteredPosts: Post[] = [];
  postLiked: boolean = false;


  constructor(private postService:PostService,
              private auth:AuthService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private likesService: LikesService,

  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (res) => {
        this.posts = res;
  
        // Itérer sur chaque post et récupérer les likes
        this.posts.forEach((post) => {
          this.likesService.getLikes(post._id).subscribe(
            (likeCount) => {
              post.likes = likeCount.count; 
            },
            (err) => {
              console.error(`Error fetching likes for post`, err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching posts:', err);
      }
    );
  }

  addLike(post: Post): void {
    this.likesService.likePost(post._id, this.auth.getDataFromToken().id).subscribe(
      (res) => {
        if (res.message === 'Like added') {
          this.postLiked = true;
          post.likes++;
        }else{
          this.postLiked = false;
          post.likes--;
        }
        
      },
      (err) => {
        console.error(err);
      }
    );
  }
  

  // fetchLikeCount(post: Post): void {
  //   this.likesService.getLikes(post._id).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }


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
