import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CreateModalComponent } from './create-modal.component';
import { UsersService } from 'src/app/services/users/users.service';
import { ToasterModalService } from 'src/app/services/toastr/toaster-modal.service';
import { Observable, of } from 'rxjs';
import { UserDataType } from 'src/app/pages/users-table/users-table.component';

import { SubscribeDirective } from '@ngneat/subscribe';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CreateModalComponent>>;
  let toastrServiceSpy: jasmine.SpyObj<ToasterModalService>;



  beforeEach(async () => {
    
    const usersServiceSpyObj = jasmine.createSpyObj('UsersService', ['createUserInfo']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const toastrServiceSpyObj = jasmine.createSpyObj('ToasterModalService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      declarations: [ 
        CreateModalComponent,
        
      ],
      imports: [
        SubscribeDirective,
        HttpClientModule,
        
        MatDialogModule,
        MatFormFieldModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: UsersService, useValue: usersServiceSpyObj },
        { provide: ToasterModalService, useValue: toastrServiceSpyObj }
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModalComponent);
    component = fixture.componentInstance;
    usersServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateModalComponent>>;
    toastrServiceSpy = TestBed.inject(ToasterModalService) as jasmine.SpyObj<ToasterModalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangeUserEmail', () => {
    it('should update the email field', () => {
      const emailInput = fixture.debugElement.query(By.css('input[matInput][placeholder="Ex. test@example.com"]'));
      emailInput.nativeElement.value = 'test@example.com';
      emailInput.triggerEventHandler('change', { target: emailInput.nativeElement });
      expect(component.email).toEqual('test@example.com');
    });
  });

  describe('onChangeFirstName', () => {
    it('should update the first name field', () => {
      const firstNameInput = fixture.debugElement.query(By.css('input[matInput][placeholder="Ex. John"]'));
      firstNameInput.nativeElement.value = 'John';
      firstNameInput.triggerEventHandler('change', { target: firstNameInput.nativeElement });
      expect(component.first_name).toEqual('John');
    });
  });


  describe('onChangeLastName', () => {
    it('should update the last name field', () => {
      const lastNameInput = fixture.debugElement.query(By.css('input[matInput][placeholder="Ex. Doe"]'));
      lastNameInput.nativeElement.value = 'Doe';
      lastNameInput.triggerEventHandler('change', { target: lastNameInput.nativeElement });
      expect(component.last_name).toEqual('Doe');
    });
  });
})