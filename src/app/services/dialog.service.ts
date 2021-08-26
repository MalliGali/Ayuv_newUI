import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../Pages/MainPages/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private ngbModal: NgbModal) {
  }

  openDialog(): Promise<any>{
    var modalRef = this.ngbModal.open(DialogComponent, {size: 'sm' , backdrop: 'static'});
    return modalRef.result;
  }
 
}
