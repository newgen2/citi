import { Component, OnInit, OnDestroy, ViewChild, SimpleChange, QueryList  } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Subject ,Observable } from 'rxjs/Rx';
import { SessionService } from '../../common-service/session.service';
import { DialogConfirmService } from '../../common-service/dialog-confirm/dialog-confirm.service';


@Component({
  templateUrl: 'userpref.component.html'
})

export class UserPrefComponent implements  OnInit {

  public currentPref;
  public DETAIL_VIEW = 'Detail View';
  public SUMMARY_VIEW = 'Summary View';
  public valueS ='';// this.DETAIL_VIEW;
  public userPreference= [{ name: this.DETAIL_VIEW, checked: true },{ name: this.SUMMARY_VIEW, checked: false }];

  constructor( private session:SessionService, private dialog : DialogConfirmService) { }
    ngOnInit() {
      this.valueS = this.currentPref;
      console.log(this.valueS);
    }
   
    selectPref(){
      
      //alert(this.valueS);
      var detail = "0";
      var summary = "0";
      if(this.valueS == this.SUMMARY_VIEW){
         summary = "1";
         detail = "0";
      }else if(this.valueS == this.DETAIL_VIEW){
        detail = "1";
        summary = "0";
      }

      debugger;
      var val=[{"preferenceValue":summary,"preferenceName":"SUMMARY_TABLE"},{"preferenceValue":detail,"preferenceName":"TRADE_DETAILS_TABLE"}];
      //sessionStorage.setItem("userPref", JSON.stringify(val));
      //alert('Preference has been saved.');
      this.session.updatePref(val).subscribe((data)=> {
        
        debugger;
          if(data.RESPONSECODE == 1){
            var msg = data.RESPONSEMSG;
             console.log(msg);
             this.dialog.alert(msg);
          }else if(data.RESPONSECODE == -2){
            var msg = data.RESPONSEMSG;
            this.dialog.alert(msg);
          }
              }, (err)=>{
                console.log(err);
            });  
    }
 }

