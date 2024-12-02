import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  

  postForm: FormGroup ;
  image : any;
  
  constructor(private formBuilder:FormBuilder,private auth:AuthService , private postService:PostService,private router:Router) { 

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      
    });
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
    }
  }

  create(){
    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('content', this.postForm.get('content')?.value);
    formData.append('image', this.image);
    formData.append('userId', this.auth.getDataFromToken().id);

    this.postService.addPost(formData).subscribe(
      res=>{
        this.router.navigate(['/home']);
        console.log(res);
      },
      err=>{
        console.log(err);
      })
  }
  

  
}
