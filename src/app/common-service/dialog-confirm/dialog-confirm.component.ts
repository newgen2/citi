import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserIdleService } from '../../IdleTimeFiles';
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() isAlert : boolean;
  @Input() isTimeout : boolean;
  public ticks;public timeout;
  constructor(private userIdle: UserIdleService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
    this.userIdle.resetTimer();
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
