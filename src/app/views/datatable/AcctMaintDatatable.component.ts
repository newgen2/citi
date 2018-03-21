import { AfterViewInit, Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SessionService } from '../../common-service/session.service';

@Component({
  selector: 'acctMaint-datatable',
  templateUrl: 'AcctMaintDatatable.component.html'
})
export class AcctMaintDatatableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @Output() someEvent = new EventEmitter<Event>();
  @Output() commentEvent = new EventEmitter<Event>();
  public count=0;
  constructor(private session: SessionService) { }

  // callParent(index: any) {
  //   this.someEvent.next(this.popupDetailJSON[index]);

  // }

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  public rowData: string[] = [];
  public dyncolumn: string[] = [];
  public countRows=0;
  ngOnInit(): void {
     //this.dtTrigger.next();
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
  // dynColumn: any = [], dynColumnWidth: any = [], xlsData: any = [], rowKeys: any = [], count: any, surroKeys: any = [], addComment: any, addCommentAppConfig: any, sendEmailAppConfig: any, showDetailsAppConfig: any, popupDetailJSON: any
   public setup(xlsData: any = [],dynColumn: any = [],countRows) {
    this.rowData=[];
    this.dyncolumn=[];
    this.rowData = xlsData;
    this.dyncolumn=dynColumn;
   this.countRows=countRows;
    console.log(this.rowData,this.dyncolumn);
    if(this.count==0)
    {
    this.dtTrigger.next();
    this.count++;
    }
   }

}

