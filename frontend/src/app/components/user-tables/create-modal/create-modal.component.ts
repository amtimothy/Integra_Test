import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserDataType } from 'src/app/pages/users-table/users-table.component';
import { UsersService } from 'src/app/services/users/users.service';
import { ToasterModalService } from 'src/app/services/toastr/toaster-modal.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})

export class CreateModalComponent {
  private usersService = inject(UsersService);
  private toastrService = new ToasterModalService();

  createUserInfoMutation = this.usersService.createUserInfo();

  constructor(
    public dialogRef: MatDialogRef<CreateModalComponent>,
  ) {
    
  }

  email: string = '';
  first_name: string = '';
  last_name: string = '';

  onChangeUserEmail(event: any) {
    this.email = event.target.value;
  }

  onChangeFirstName(event: any) {
    this.first_name = event.target.value;
  }

  onChangeLastName(event: any) {
    this.last_name = event.target.value;
  }

  onCreateUserInfo() {
    this.createUserInfoMutation.mutate(({
      email: this.email ,
      first_name: this.first_name ,
      last_name: this.last_name
    })).then((res) => {
      this.toastrService.showSuccess({
        title: "Success",
        msg: 'Create User Successfully!'
      })
      this.dialogRef.close();
      return null;
    }).catch((err) => {
      this.toastrService.showError({
        title: 'Failed',
        msg: "Create User Failed!"
      })
      this.dialogRef.close();
    })
  }
}
