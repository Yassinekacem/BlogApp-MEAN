import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModelComponent } from '../../../layouts/delete-model/delete-model.component';


@Component({
  selector: 'app-mange-users',
  templateUrl: './mange-users.component.html',
  styleUrl: './mange-users.component.scss'
})
export class MangeUsersComponent implements OnInit {


  users : UserModel[] = [];

  constructor(  private auth:AuthService,
                private dialog: MatDialog,
                private snackbar: MatSnackBar

  ) { }



  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(
      res=>{
        this.users = res;
      },
      err=>{
        console.log(err);
      }
  )}
  

  deleteUser(userToDelete: UserModel) {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      width: '450px',
      data: {
        title: 'Delete User',
        description: `This action will permanently delete '${userToDelete.firstName+" "+userToDelete.lastName}' Post, Are you sure you want to proceed this action ?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.auth
          .deleteUser(userToDelete._id)
          .subscribe({
            next: (res) => {
              this.openSnackBar(
                this.snackbar,
                'User deleted successfully',
                'app-notification-success'
              );
              this.users = this.users.filter(
                (item) =>
                  item._id !== userToDelete._id
              );
              // this.filteredPosts = this.filteredPosts.filter(
              //   (item) =>
              //     item._id !== userToDelete._id
              // );
            },
            error: (err) => {
              this.openSnackBar(
                this.snackbar,
                'Error deleting User',
                'app-notification-error'
              );
            },
          });
      }
    });
  }

  openSnackBar(snackbar: MatSnackBar, mainText: string, color: string) {
  snackbar.open(mainText, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
      panelClass: [color,'custom-snackbar']
  });
  }




}
