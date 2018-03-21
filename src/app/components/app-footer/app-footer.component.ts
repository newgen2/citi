import { Component } from '@angular/core';
//import { SessionService } from '../../common-service/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html'
})
export class AppFooterComponent { 
  public feedType1_text;
  public feedType1_time;
  public feedType2_text;
  public feedType2_time;
  constructor(){}
  // constructor( private session:SessionService){}
  ngOnInit(): void { }

}
