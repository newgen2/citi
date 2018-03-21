import { Component } from '@angular/core';
//import { SessionService } from '../../common-service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  public currentUser;
  public soeid;
  public loggedinTime;
  public headerTitle;
  constructor(){}
  // constructor( private session:SessionService){}
ngOnInit(): void {

}
}
