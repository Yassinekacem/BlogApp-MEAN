import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {


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
      role:['', [Validators.required]],
    });

  }


  ngOnInit(): void {

    this.userid = this.route.snapshot.params['id'];

    this.auth.getUserById(this.userid).subscribe(
      (user) => {
        this.updateForm?.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          description: user.description,
          role: user.role
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
      const updatedUser = new FormData();
      updatedUser.append('firstName', this.updateForm.value.firstName);
      updatedUser.append('lastName', this.updateForm.value.lastName);
      updatedUser.append('email', this.updateForm.value.email);
      updatedUser.append('description', this.updateForm.value.description);
      updatedUser.append('role', this.updateForm.value.role);

      if (this.image != '' || this.image != null) {
        updatedUser.append('image', this.image);
      }


    this.auth.updateUserById(this.userid, updatedUser).subscribe(
      (user) => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
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
