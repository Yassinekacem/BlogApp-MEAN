import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PostRoutingModule } from './post-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatePostComponent,
    ViewPostComponent,
    EditPostComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule ,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ]
})
export class PostModule { }
