import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface ModalMessageType  {
  title: string,
  msg: string
}

@Injectable({
  providedIn: 'root'
})
export class ToasterModalService {
  private toastr: ToastrService = inject(ToastrService) ;
  constructor(
    
  ) { }

  showSuccess(data: ModalMessageType) {
    this.toastr.success(data.msg, data.title);
  }

  showError(data: ModalMessageType) {
    this.toastr.error(data.msg, data.title);
  }
}
