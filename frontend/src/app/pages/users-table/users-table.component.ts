import { Component, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'
import { UsersService } from 'src/app/services/users/users.service';

import { EditModalComponent } from 'src/app/components/user-tables/edit-modal/edit-modal.component';
import { CreateModalComponent } from 'src/app/components/user-tables/create-modal/create-modal.component';

export interface UserDataType {
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  active?: number;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  private usersService = inject(UsersService);
  deleteUserInfoMutation = this.usersService.deleteUserInfo();

  displayColumns: string[] = ['User Name', 'First Name', 'Last Name'];
  dataSource: UserDataType[] = [];
  
  allUserInfo$ = inject(UsersService).getAllUsers().result$;

  constructor(public dialog: MatDialog) {}

  ngInit() {
    
  }

  ngAfterViewInit(): void {

  }

  openEditDialog(editableInfo: UserDataType) {
    const modalRef = this.dialog.open(EditModalComponent, {
      data: editableInfo
    });

    modalRef?.afterClosed().subscribe((result) => {
      console.log(`Edit User Dialog: ${result}`)
    })
  }

  openCreateDialog() {
    const modalRef = this.dialog.open(CreateModalComponent);

    modalRef?.afterClosed().subscribe((result) => {
      console.log(`Create User Dialog: ${result}`)
    })
  }

  onDeleteUserInfo(user_id?: string) {
    if(user_id) {
      this.deleteUserInfoMutation.mutate(({
        user_id
      })).then((res: any) => {
        console.log(res);
      })
    }
  }
}
