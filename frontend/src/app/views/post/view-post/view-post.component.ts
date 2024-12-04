import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  id : any;
  post : Post | undefined;

  constructor(private route:ActivatedRoute , private postService:PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.postService.getPostById(this.id).subscribe(
      res=>{
        this.post = res;
      },
      err=>{
        console.log(err);
      }
    )

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
