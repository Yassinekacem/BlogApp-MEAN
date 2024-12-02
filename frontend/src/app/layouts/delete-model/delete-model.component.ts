import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrl: './delete-model.component.scss'
})
export class DeleteModelComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteModelComponent>) {}

  confirm() {
    this.dialogRef.close({
      data: {
        confirmed: true,
      }
    })
  }

}
