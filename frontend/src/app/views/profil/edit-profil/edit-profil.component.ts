import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.scss'
})
export class EditProfilComponent implements OnInit {

  loading: boolean = false;
  errorMessage: string = '';
  updateForm: FormGroup;
  image: any;
  userid: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {

    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      description: [''],
    });

  }


  ngOnInit(): void {

    this.userid = this.auth.getDataFromToken().id;

    this.auth.getUserById(this.userid).subscribe(
      (user) => {
        this.updateForm?.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          description: user.description
        })
      },
      err => {
        console.log(err)
      }
    )
  }


  editProfil(){

    if (this.updateForm.valid) {
       
      this.loading = true;
      const updatedPost = new FormData();
      updatedPost.append('firstName', this.updateForm.value.firstName);
      updatedPost.append('lastName', this.updateForm.value.lastName);
      updatedPost.append('email', this.updateForm.value.email);
      updatedPost.append('description', this.updateForm.value.description);

      if (this.image != '' || this.image != null) {
        updatedPost.append('image', this.image);
      }


    this.auth.updateUserById(this.userid, updatedPost).subscribe(
      (user) => {
        this.loading = false;
        this.router.navigate(['/profil/view/',this.userid]);
      },
      err => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur';
        console.log(err)
      }
    )
  }

  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
    }
  }
}
