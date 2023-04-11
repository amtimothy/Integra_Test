import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    MatDialog
} from '@angular/material/dialog';
import {
    of
} from 'rxjs';
import {
    UsersService
} from 'src/app/services/users/users.service';

import {
    UsersTableComponent
} from './users-table.component';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { SubscribeDirective } from '@ngneat/subscribe';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('UsersTableComponent', () => {
    let component: UsersTableComponent;
    let fixture: ComponentFixture < UsersTableComponent > ;
    let mockDialog: jasmine.SpyObj < MatDialog > ;
    let mockUsersService: jasmine.SpyObj < UsersService > ;

    const mockUserInfo = {
        user_id: '1',
        email: 'test@test.com',
        first_name: 'John',
        last_name: 'Doe',
        active: 1
    };

    beforeEach(async () => {
        mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
        mockUsersService = jasmine.createSpyObj('UsersService', ['getAllUsers', 'deleteUserInfo']);
        mockUsersService.getAllUsers.and.returnValue({
            data:[]
        });
        
        await TestBed.configureTestingModule({
            declarations: [UsersTableComponent],
            imports: [
                SubscribeDirective,
                HttpClientModule,
                
                MatDialogModule,
                MatFormFieldModule,
                ToastrModule.forRoot()
            ],
            providers: [{
                    provide: MatDialog,
                    useValue: mockDialog
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open edit dialog', () => {
        const mockUserInfo = {
            user_id: '1',
            email: 'test@test.com',
            first_name: 'John',
            last_name: 'Doe',
            active: 1
        };
        component.openEditDialog(mockUserInfo);
        expect(mockDialog.open).toHaveBeenCalled()
    });

    it('should open create dialog', () => {
        component.openCreateDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });

    // it('should delete user info', async () => {
    //     const mockUserInfo = {
    //         user_id: '1',
    //         email: 'test@test.com',
    //         first_name: 'John',
    //         last_name: 'Doe',
    //         active: 1
    //     };
    //     await component.onDeleteUserInfo(mockUserInfo.user_id);
    //     expect(mockUsersService.deleteUserInfo).toHaveBeenCalledWith({
    //         user_id: mockUserInfo.user_id
    //     });
    // });
});