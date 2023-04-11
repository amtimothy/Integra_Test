import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserDataType } from 'src/app/pages/users-table/users-table.component';
import { ToasterModalService } from 'src/app/services/toastr/toaster-modal.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  private usersService = inject(UsersService);
  private toastrService = new ToasterModalService();

  public editUserInfoMutation: any = {
    $result: {
      data: [],
    },
    isLoading: false
  };

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDataType | null
  ) {
    this.email = data?.email || '';
    this.first_name = data?.first_name || '';
    this.last_name = data?.last_name || '';
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

  onEditUserInfo() {
    this.editUserInfoMutation = this.usersService.editUserInfo({
      user_id: this.data?.user_id || '',
      email: this.email ,
      first_name: this.first_name ,
      last_name: this.last_name ,
      active: this.data?.active || 0
    });
    
    this.editUserInfoMutation.mutate().then((res: any) => {
      this.toastrService.showSuccess({
        title: 'Edit User Successfully!',
        msg: 'Edit User Failed!'
      })
      this.dialogRef.close();
    }).catch((err: any) => {
      this.toastrService.showError({
        title: 'Edit User Failed!',
        msg: 'Edit User Failed'
      })
      this.dialogRef.close();
    })
  }
}
