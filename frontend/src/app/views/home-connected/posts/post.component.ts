import { Component , OnInit  } from '@angular/core';
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
  styleUrls: ['./post.component.scss'] // Corrigé : "styleUrl" devient "styleUrls"
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  likeCounts: { [key: string]: number } = {};  // Stocke le nombre de likes pour chaque post  
  commentCounts: { [key: string]: number } = {}; // Stocke le nombre de likes pour chaque post   
  likedPosts: { [key: string]: boolean } = {}; // Stocke l'état de like pour chaque post



  constructor(
    private postService: PostService,
    private auth: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (res) => {
        this.posts = res;
        this.fetchLikesForPosts();
        this.fetchCommentsForPosts();
        this.posts.forEach((post) => {
          this.checkIfLiked(post._id); // Vérifie si chaque post a été liké par l'utilisateur
        });
      },
      (err) => {
        console.log('Erreur lors de la récupération des posts', err);
      }
    );
  }
  
  

  // Vérifie si l'utilisateur actuel est l'auteur d'un post
  isAuthor(post: Post): boolean {
    return this.auth.getDataFromToken().id === post.userId._id;
  }

  // Supprime un post
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
          next: () => {
            this.openSnackBar('Post deleted successfully', 'app-notification-success');
            this.posts = this.posts.filter((item) => item._id !== postToDelete._id);
          },
          error: (err) => {
            this.openSnackBar('Error deleting post', 'app-notification-error');
            console.log(err);
          },
        });
      }
    });
  }

  // Récupère les likes pour chaque post
  fetchLikesForPosts(): void {
    this.posts.forEach((post) => {
      this.postService.getLikes(post._id).subscribe(
        (res) => {
          this.likeCounts[post._id] = res.likeCount; // Stocke le nombre de likes pour ce post
        },
        (err) => {
          console.log(`Erreur lors de la récupération des likes pour le post ${post._id}`, err);
          this.likeCounts[post._id] = 0; // Valeur par défaut en cas d'erreur
        }
      );
    });
  } 

 
  fetchCommentsForPosts(): void {
    this.posts.forEach((post) => {
      this.postService.getComments(post._id).subscribe(
        (res) => {
          this.commentCounts[post._id] = res.commentCount; // Stocke le nombre de commentaires pour ce post
        },
        (err) => {
          console.log(`Erreur lors de la récupération des commentaires pour le post ${post._id}`, err);
          this.commentCounts[post._id] = 0; // Valeur par défaut en cas d'erreur
        }
      );
    });
  }
  
  likePost(postId: string): void {
    const userId = this.auth.getDataFromToken().id; // ID de l'utilisateur connecté
  
    if (this.likedPosts[postId]) {
      // Si déjà liké, récupérer l'ID du like et le supprimer
      this.postService.getLikeId(postId, userId).subscribe(
        (res) => {
          const likeId = res.likeId; // ID du like retourné par l'API
          if (likeId) {
            this.postService.deleteLike(likeId).subscribe(
              () => {
                // Mettre à jour le compteur et l'état des likes
                this.likeCounts[postId] = Math.max(0, (this.likeCounts[postId] || 1) - 1);
                this.likedPosts[postId] = false;
              },
              (err) => {
                console.error(`Erreur lors de la suppression du like pour le post ${postId}`, err);
                this.openSnackBar('Erreur lors de la suppression du like', 'app-notification-error');
              }
            );
          }
        },
        (err) => {
          console.error(`Erreur lors de la récupération de l'ID du like pour le post ${postId}`, err);
          this.openSnackBar('Erreur lors de la récupération de l\'ID du like', 'app-notification-error');
        }
      );
    } else {
      // Si pas encore liké, ajouter un like
      this.postService.addLike(userId, postId).subscribe(
        () => {
          // Mettre à jour le compteur et l'état des likes
          this.likeCounts[postId] = (this.likeCounts[postId] || 0) + 1;
          this.likedPosts[postId] = true;
        },
        (err) => {
          console.error(`Erreur lors de l'ajout du like pour le post ${postId}`, err);
          this.openSnackBar('Erreur lors de l\'ajout du like', 'app-notification-error');
        }
      );
    }
  }
  
  
  
  

  // Vérifie si l'utilisateur a liké un post
checkIfLiked(postId: string): void {
  const userId = this.auth.getDataFromToken().id; // Récupérer l'ID de l'utilisateur connecté
  this.postService.checkLikeStatus(postId, userId).subscribe(
    (res) => {
      if (res.liked) {
        // Si l'utilisateur a liké le post, on met à jour l'état du like
        this.likedPosts[postId] = true;
      } else {
        this.likedPosts[postId] = false;
      }
    },
    (err) => {
      console.error(`Erreur lors de la vérification du like pour le post ${postId}`, err);
    }
  );
}



  // Affiche une notification
  openSnackBar(message: string, color: string) {
    this.snackbar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
      panelClass: [color, 'custom-snackbar']
    });
  }
}
