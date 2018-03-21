import { Component,HostListener } from '@angular/core';
import { UserIdleService } from '../../IdleTimeFiles';
import { DialogConfirmService } from '../../common-service/dialog-confirm/dialog-confirm.service';
import { DialogConfirmComponent } from '../../common-service/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent { 

  constructor(private userIdle: UserIdleService, private dialog : DialogConfirmService) { }
  ngOnInit(): void {
    // this.userIdle.idle=10;
    // this.userIdle.timeout=5;
    this.userIdle.startWatching();
    
    DialogConfirmComponent.prototype.timeout=this.userIdle.timeout;
    //this.dialog.alertTimeOut("Timer"+count);
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      DialogConfirmComponent.prototype.ticks=count;
      if(count==1) 
      this.dialog.alertTimeOut("Your session will be logout after "); 
    });
    // Start watch when time is up.
     this.userIdle.onTimeout().subscribe(() => window.location.href = "../PCPFDS/pcplogout.jsp");
  }
  @HostListener('window:keyup', ['$event'])
  @HostListener('click', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    // this.stop();
    // this.stopWatching();
    // this.startWatching();
    this.restart();
  }
  
  // @HostListener('mouseover') onHover() {
  //   this.stop();
  //   this.stopWatching();
  //   this.startWatching();
  //   this.restart();
  //   this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
  // }
  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }
}
