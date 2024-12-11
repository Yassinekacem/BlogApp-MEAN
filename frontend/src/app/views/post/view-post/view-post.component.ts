import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';
import { AuthService } from '../../../services/auth.service';
import { CommentsService } from '../../../services/comments.service';
import { UserModel } from '../../../models/User.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  id: string | undefined;
  post: Post | undefined;
  likeCount: number = 0; 
  commentCount: number = 0;
  liked: boolean = false;
  comments: any[] = []; // Liste des commentaires récupérés via l'API 
  newCommentContent: string = ''; // Contenu du nouveau commentaire
  user: UserModel | undefined ; 
  isDeleteConfirmationVisible: boolean = false;
  confirmDeleteCommentId: string | undefined;
  isEditModalVisible: boolean = false;
  editCommentId: string | undefined;
  editCommentContent: string = ''; // Le contenu du commentaire à modifier


  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService, 
    private postService: PostService,
    private auth: AuthService
  ) {}

  loadUserData(): void {
    this.user = this.auth.getDataFromToken();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadPostData(this.id);
      } 
      this.loadUserData(); // Charge les informations de l'utilisateur connecté

    });
  } 



  // Charge les données du post
  loadPostData(postId: string): void {
    this.postService.getPostById(postId).subscribe(
      (res) => {
        this.post = res;
        this.fetchLikes(postId);
        this.fetchComments(postId); // Récupère les commentaires dynamiquement
        this.checkIfLiked(postId);
      },
      (err) => {
        console.log('Erreur lors de la récupération du post', err);
      }
    );
  }

  currentUser(commentUserId: string): boolean {
    // Comparer l'ID de l'utilisateur connecté avec l'ID de l'utilisateur du commentaire
    return this.auth.getDataFromToken().id === commentUserId;
  }
  

  
  // Récupère les commentaires d'un post
  fetchComments(postId: string): void {
    this.commentsService.getCommentsByPostId(postId).subscribe(
      (res) => {
        this.comments = res.comments; // Mettez à jour la liste des commentaires
        this.commentCount = this.comments.length; // Met à jour le nombre de commentaires
      },
      (err) => {
        console.error('Erreur lors de la récupération des commentaires', err);
      }
    );
  }

  // Vérifie si l'utilisateur a déjà liké
  checkIfLiked(postId: string): void {
    const userId = this.auth.getDataFromToken().id;
    this.postService.checkLikeStatus(postId, userId).subscribe(
      (res) => {
        this.liked = res.liked;
      },
      (err) => {
        console.error('Erreur lors de la vérification du like', err);
      }
    );
  }

  // Récupère le nombre de likes
  fetchLikes(postId: string): void {
    this.postService.getLikes(postId).subscribe(
      (res) => {
        this.likeCount = res.likeCount;
      },
      (err) => {
        console.error('Erreur lors de la récupération des likes', err);
      }
    );
  }  

 addComment(): void {
 

    const userId = this.auth.getDataFromToken().id; 
    
    // Récupérer l'ID de l'utilisateur connecté
    const formData = new FormData();

    formData.append('content', this.newCommentContent);
    formData.append('userId', userId);
    formData.append('postId', this.id!); 
    formData.append('userPhoto', this.user!.image);

    this.commentsService.addComment(formData).subscribe(
      res => {
        console.log('Commentaire ajouté avec succès', res);
        this.newCommentContent = ''; // Réinitialiser le champ de saisie
        this.fetchComments(this.id!); // Recharger les commentaires
      },
      err => {
        console.error('Erreur lors de l\'ajout du commentaire', err);
      }
    );
  } 



 // Afficher le modal de confirmation avant de supprimer le commentaire
 confirmDeleteComment(commentId: string): void {
  this.isDeleteConfirmationVisible = true;
  this.confirmDeleteCommentId = commentId || ''; // Utilisez une valeur par défaut si undefined
}


// Annuler la suppression
cancelDelete(): void {
  this.isDeleteConfirmationVisible = false;
  this.confirmDeleteCommentId = undefined;
}


  // Afficher le modal d'édition
  openEditModal(commentId: string, currentContent: string): void {
    this.isEditModalVisible = true;
    this.editCommentId = commentId;
    this.editCommentContent = currentContent;
  }


    // Fermer le modal d'édition
    closeEditModal(): void {
      this.isEditModalVisible = false;
      this.editCommentContent = ''; // Réinitialiser le contenu de l'édition
    }




    // Mettre à jour le commentaire
  updateComment(): void {
    if (!this.editCommentId || !this.editCommentContent) return;

    const updatedComment = { content: this.editCommentContent };
    
    this.commentsService.updateComment(this.editCommentId, updatedComment).subscribe(
      res => {
        console.log('Commentaire mis à jour avec succès', res);
        this.fetchComments(this.id!); // Recharger les commentaires
        this.closeEditModal(); // Fermer le modal
      },
      err => {
        console.error('Erreur lors de la mise à jour du commentaire', err);
      }
    );
  }

// Supprimer le commentaire après confirmation
deleteComment(commentId: string): void {
  this.commentsService.deleteComment(commentId).subscribe(
    () => {
      this.comments = this.comments.filter(comment => comment._id !== commentId); // Mettre à jour la liste des commentaires
      this.cancelDelete(); // Fermer le modal
      console.log('Commentaire supprimé avec succès');
    },
    (err) => {
      console.error('Erreur lors de la suppression du commentaire', err);
    }
  );
}


  // Gère le like/unlike
  toggleLike(): void {
    const userId = this.auth.getDataFromToken().id;

    if (this.liked) {
      this.postService.getLikeId(this.id!, userId).subscribe(
        (res) => {
          const likeId = res.likeId;
          if (likeId) {
            this.postService.deleteLike(likeId).subscribe(
              () => {
                this.likeCount = Math.max(0, this.likeCount - 1);
                this.liked = false;
              },
              (err) => {
                console.error('Erreur lors de la suppression du like', err);
              }
            );
          }
        },
        (err) => {
          console.error('Erreur lors de la récupération de l\'ID du like', err);
        }
      );
    } else {
      this.postService.addLike(userId, this.id!).subscribe(
        () => {
          this.likeCount += 1;
          this.liked = true;
        },
        (err) => {
          console.error('Erreur lors de l\'ajout du like', err);
        }
      );
    }
  }
}