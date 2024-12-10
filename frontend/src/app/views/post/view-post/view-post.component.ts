import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  id: string | undefined;
  post: Post | undefined;
  likeCount: number = 0; 
  commentCount: number = 0;
  liked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadPostData(this.id);
      }
    });
  } 


    // Charge les données du post
    loadPostData(postId: string): void {
      this.postService.getPostById(postId).subscribe(
        (res) => {
          this.post = res;
          this.fetchLikes(postId);
          this.fetchComments(postId);
          this.checkIfLiked(postId);
        },
        (err) => {
          console.log('Erreur lors de la récupération du post', err);
        }
      );
    } 




  
    // Récupère le nombre de commentaires
    fetchComments(postId: string): void {
      this.postService.getComments(postId).subscribe(
        (res) => {
          this.commentCount = res.commentCount;
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


   comments = [
    {
      author: 'User 1',
      text: 'This is a sample comment.',
      replies: [
        { author: 'User 2', text: 'This is a reply to the comment.' }
      ],
      showReply: false
    },
    {
      author: 'User 3',
      text: 'Another sample comment.',
      replies: [],
      showReply: false
    }
  ];

  addReply(comment: any, event: Event) {
    const input = event.target as HTMLInputElement;
    const replyText = input.value.trim();
    if (replyText) {
      comment.replies.push({ author: 'Current User', text: replyText });
      comment.showReply = false;
      input.value = ''; // Clear input after submission
    }
  }

  }
