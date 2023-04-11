import { Injectable, Query, inject } from '@angular/core';
import { UseQuery, UseMutation, QueryClientService } from '@ngneat/query';
import { HttpClient } from '@angular/common/http';

import { UserDataType } from 'src/app/pages/users-table/users-table.component';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private useMutation = inject(UseMutation);
  private useQuery = inject(UseQuery);
  private queryClient = inject(QueryClientService);
  private http = inject(HttpClient);

  constructor() { }

  getAllUsers() {
    return this.useQuery(['getAllUsers'], () => {
      return this.http.get<UserDataType[]>(
        'http://localhost:8080/users'
      );
    }) as any;
  }

  editUserInfo(editableInfo: UserDataType) {
    return this.useMutation(() => {
      return this.http.post<{success: boolean}>(`http://localhost:8080/users/${editableInfo.user_id}`, editableInfo).pipe(
        tap((newUser: any) => {
          this.queryClient.invalidateQueries(['getAllUsers']);
        })
      )
    });
  }

  deleteUserInfo() {
    return this.useMutation(({user_id} : {user_id: string}) => {
      return this.http.delete<{success : boolean}>(`http://localhost:8080/users/${user_id}`).pipe(
        tap((newuser: any) => {
          this.queryClient.invalidateQueries(['getAllUsers']);
        })
      )
    }) as any;
  }

  createUserInfo() {
    return this.useMutation((newUserInfo : UserDataType) => {
      return this.http.post(`http://localhost:8080/users`, newUserInfo).pipe(
        tap((newUser: any) => {
          this.queryClient.invalidateQueries(['getAllUsers']);
        })
      )
    })
  }
}
