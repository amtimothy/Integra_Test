import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all users from the server', () => {
    const mockUsers = [
      { user_id: '1', name: 'John Doe' },
      { user_id: '2', name: 'Jane Smith' }
    ];

    service.getAllUsers().subscribe((users:any) => {
      expect(users.data).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });
});



