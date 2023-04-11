import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterModalService } from './toaster-modal.service';

describe('ToasterModalService', () => {
  let service: ToasterModalService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrSpyObj = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      providers: [
        ToasterModalService,
        { provide: ToastrService, useValue: toastrSpyObj }
      ]
    });

    service = TestBed.inject(ToasterModalService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ToastrService.success method with correct arguments when showSuccess is called', () => {
    const data = { title: 'Success', msg: 'Operation completed successfully' };

    service.showSuccess(data);

    expect(toastrSpy.success).toHaveBeenCalledWith(data.msg, data.title);
  });

  it('should call ToastrService.error method with correct arguments when showError is called', () => {
    const data = { title: 'Error', msg: 'Operation failed' };

    service.showError(data);

    expect(toastrSpy.error).toHaveBeenCalledWith(data.msg, data.title);
  });
});



