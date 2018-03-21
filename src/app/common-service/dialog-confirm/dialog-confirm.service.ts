import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogConfirmComponent} from './dialog-confirm.component'
@Injectable()
export class DialogConfirmService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    isAlert:boolean = false,
    isTimeout:boolean=false,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogConfirmComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.isAlert = isAlert;
    modalRef.componentInstance.isTimeout = isTimeout;

    return modalRef.result;
  }
  public alert(
    // title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    isAlert:boolean = true,
    isTimeout:boolean=false,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogConfirmComponent, { size: dialogSize });
    modalRef.componentInstance.title = "Alert";
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.isAlert = isAlert;
    modalRef.componentInstance.isTimeout = isTimeout;
    return modalRef.result;
  }
  public alertTimeOut(
    // title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    isAlert:boolean = true,
    isTimeout:boolean=true,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogConfirmComponent, { size: dialogSize });
    modalRef.componentInstance.title = "Alert";
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.isAlert = isAlert;
    modalRef.componentInstance.isTimeout = isTimeout;
    // modalRef.componentInstance.ticks = this.ticks;
    return modalRef.result;
  }
}
