import { AfterViewInit, Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SessionService } from '../../common-service/session.service';
import { CommonFunctions } from '../../common-service/commonFunctions.service';
@Component({
  selector: 'my-datatable',
  templateUrl: 'datatable.component.html'
})
export class DatatableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @Output() someEvent = new EventEmitter<Event>();
  @Output() commentEvent = new EventEmitter<Event>();
  commentFlag;
  addCommentAppConfig;
  sendEmailAppConfig;
  showDetailsAppConfig;
  
  //input fields for email pop-over
  to = "";
  subject = "";
  message = "";

  constructor(private session : SessionService, private commonFunctions : CommonFunctions) { }

  loadPopDetailsModel(index: any) {
    let key;
    //key = this.surroKey[index];
    key = this.popupDetailJSON[index];
    key = key.SURROGATE_KEY;
    this.someEvent.next(this.popupDetailJSON[index]);
  }

  public position;
  public addComment(e, index) {
    this.hideEmailPopUp();
    this.position = index;
    var popover = document.getElementById("addCommentPop");
    popover.style.display = "inline";
    popover.style.top = (e.clientY - 100) + "px";
    popover.style.left = (e.clientX - 420) + "px";
    var el = document.getElementById('tbale2');
  }
  public hideCommentPopUp() {

    var popover = document.getElementById("addCommentPop");
    popover.style.display = "none";

  }

  public btnSendEmail_click(e, index, ...rec: any[]) {
    this.position = index;
    this.hideCommentPopUp();
    var popover = document.getElementById("myEmailPop");
    popover.style.display = "inline";
    popover.style.top = (e.clientY - 200) + "px";
    popover.style.left = (e.clientX - 650) + "px";

  }
  public hideEmailPopUp() {
    var popover = document.getElementById("myEmailPop");
    popover.style.display = "none";
  }

public sendEmail(toEmail: any, subject: any, message: any) {
  
  //Call the Common email function
  var myStatus = this.commonFunctions.sendEmail
  ( 
    toEmail, 
    subject, 
    message, 
    this.popupDetailJSON[this.position]
  );
  
  //If email is sent then reset the fields and hide the email pop-over
  if(myStatus == true){
    var popover = document.getElementById("myEmailPop");
    popover.style.display = "none";
    this.to = "";
    this.subject = "";
    this.message = "";
  }  
}

  public flag = false;
  public columnData: string[] = [""];
  public dynColumnWidth: any = [];
  public rowData: string[] = [];
  public rowKey: string[] = [];
  // public surroKey: string[] = [""];
  public popupDetailJSON : any =[""];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    // this.dtTrigger.next();
  }
  ngOnChanges() {

  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  //This function will setup all the neccessary data for datatable
  public setup
  (
    dynColumn: any = [], 
    dynColumnWidth: any = [], 
    xlsData: any = [], 
    rowKeys: any = [], 
    count: any, 
    addComment: any, 
    addCommentAppConfig: any, 
    sendEmailAppConfig: any, 
    showDetailsAppConfig: any, 
    popupDetailJSON: any
  ) {
    this.columnData = [];
    this.dynColumnWidth = [];
    this.rowData = [];
    this.rowKey = [];
    // this.surroKey = [];
    // this.surroKey = surroKeys;
    this.addCommentAppConfig = addCommentAppConfig;
    this.sendEmailAppConfig = sendEmailAppConfig;
    this.showDetailsAppConfig = showDetailsAppConfig;
    this.commentFlag = addComment;
    this.columnData = dynColumn;
    this.dynColumnWidth = dynColumnWidth;
    this.rowData = xlsData;
    this.rowKey = rowKeys;
    this.popupDetailJSON=popupDetailJSON;

    if (count == 0) {
      this.dtTrigger.next();
      this.flag = true;
    }
    if (count != 0) {
      this.rerender();
    }
  }

  public updateComment(value: any) {
    let key;
    //key = this.surroKey[this.position];
    key = this.popupDetailJSON[this.position];
    key = key.SURROGATE_KEY;
    let values = JSON.parse("{\"key\": \"" + key + "\",\"value\":\"" + value + "\"}");
    this.commentEvent.next(values);
  }
}

