import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit{

  UpdateForm: FormGroup ;
  image : any;
  postid :string ='';
  loading: boolean = false;
  errorMessage: string = '';



  constructor(
              private formBuilder:FormBuilder,
              private router:Router,
              private route:ActivatedRoute,
              private postService:PostService,
  ) { 
    this.UpdateForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      content: ['',[Validators.required]],
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.postid = params['id'];
    })


    this.postService.getPostById(this.postid).subscribe(
      (post) => {
        
        this.UpdateForm?.patchValue({
          title: post.title,
          content: post.content
        })
      },
      err=>{
        console.log(err);
      }
    )


  }



  editPost(){
      if (this.UpdateForm.valid) {
       
      this.loading = true;
      const updatedPost = new FormData();
      updatedPost.append('title', this.UpdateForm.value.title);
      updatedPost.append('content', this.UpdateForm.value.content);

      if (this.image != '' || this.image != null) {
        updatedPost.append('image', this.image);
      }

      this.postService.updatePost(this.postid, updatedPost).subscribe(
        (res) => {
          
          this.loading = false;
          this.router.navigate(['/home']);
        },
        (err) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur';
          console.log(err);
        }
      );
    }
  }



  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
    }
  }

}
