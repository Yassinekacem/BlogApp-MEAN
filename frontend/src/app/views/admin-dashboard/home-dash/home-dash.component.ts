import { Component, ViewChild } from '@angular/core';
import { UserModel } from '../../../models/User.model';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/Post.model';
import { CommentsService } from '../../../services/comments.service';
import { LikesService } from '../../../services/likes.service';
import { Chart } from 'angular-highcharts';






@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrl: './home-dash.component.scss'
})
export class HomeDashComponent {



   users : UserModel[] = [];
   usersNumber : number = 0;
   posts : Post[] = [];
   postsNumber : number = 0;
   comments : any[] = [];
   commentsNumber : number = 0;
   likes : any[] = [];
   likesNumber : number = 0;
   Interaction : number = 0;
   interactionWidth : string = '0%';

  
    constructor(  private auth:AuthService,
                  private postService:PostService,
                  private commentSrevice:CommentsService,
                  private likesService:LikesService,
    ) {
      
    }

    chart1 = new Chart({
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'Category wise sales'
      },
      xAxis: {
        categories: [
          'Electronics',
          'Users',
          'Cosmetics',
          'Clothes',
          'Appliances',
        ]
      },
      yAxis: {
        title: {
          text: 'Revenue in %'
        }
      },
      series: [
       {
        type: 'pie',
        data: [
          {
            name: 'Posts',
            y: 41.0,
            color: '#044342',
          },
          {
            name: 'Users',
            y: 33.8,
            color: '#7e0505',
          },
          {
            name: 'Likes',
            y: 6.5,
            color: '#ed9e20',
          },
          {
            name: 'Comments',
            y: 15.2,
            color: '#6920fb',
          },
          {
            name: 'Friends Requests',
            y: 3.5,
            color: '#121212',
          },
        ]
       }
      ],
      credits: {
        enabled: false
      }
    })
    
      chart = new Chart({
        chart: {
          type: 'line',
          height: 325
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        },
        yAxis: {
          title: {
            text: 'Traffic'
          }
        },
        series: [
          {
            name: "Posts",
            type: "line",
            color: '#044342',
            data: [10, 50, 85, 115, 92, 175, 102, 125, 233, 183, 139, 196]
          },
          {
            name: 'Users',
            type: 'line',
            color: '#7e0505',
            data: [
              47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
            ]
          },
          {
            name: 'Comments',
            type: 'line',
            color: '#ed9e20',
            data: [
              17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
            ]
          },
          {
            name: 'Likes',
            type: 'line',
            color: '#ed9e20',
            data: [
              17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
            ]
          },
        ],
        credits: {
          enabled: false
        }
    });
  
  
  
    ngOnInit(): void {
      
        this.getPosts();
        this.getUsers();
        this.getComments();
        this.getLikes();
  }


  getPosts(){
    this.auth.getAllUsers().subscribe(
      res=>{
        this.users = res;
        this.usersNumber = this.users.length;
      },
      err=>{
        console.log(err);
      }
  )
  }

  getUsers(){
    this.postService.getAllPosts().subscribe(
      res=>{
        this.posts = res;
        this.postsNumber = this.posts.length;
      },
      err=>{
        console.log(err);
      }
    )
  }

  getComments(){
    this.commentSrevice.getAllComments().subscribe(
      res=>{
        this.comments = res;
        this.commentsNumber = this.comments.length;
      },
      err=>{
        console.log(err);
      })
  }

  getLikes(){
    this.likesService.getAllLikes().subscribe(
      res=>{
        this.likes = res;
        this.likesNumber = this.likes.length;
      },
      err=>{
        console.log(err);
      })

  }

  getInteractions(likesNumber: number, commentsNumber: number, postsNumber: number) {
    if (postsNumber === 0) {
      this.Interaction = 0; 
    } else {
      this.Interaction = Math.floor(((likesNumber + commentsNumber)/2 )*100 / postsNumber) ;
      this.interactionWidth = `${this.Interaction}%`;
    }
    return this.Interaction;
  }
  

  
    

}
