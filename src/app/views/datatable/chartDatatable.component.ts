import { AfterViewInit, Component, OnInit, OnChanges, ViewChild, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SessionService } from '../../common-service/session.service';

@Component({
  selector: 'chart-datatable',
  templateUrl: 'chartDatatable.component.html'
})
export class ChartDatatableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  @Output() someEvent = new EventEmitter<Event>();
  @Output() commentEvent = new EventEmitter<Event>();
  @Input() private data: Array<any>;
  constructor(private session: SessionService) { }
  public myTableData;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      paging: true,
      pageLength: 10,
      searching: true,
      order: [0, "desc"],
      "lengthMenu": [10, 15, 20, 30, 50],
      data: [],
      columns: [{
        title: 'Member ID',
        data: 'MBR_ID'
      },
      {
        title: 'Maker ID',
        data: 'MAKER_ID'
      }, {
        
        title: 'Maker Date',
        data: 'MAKER_DT'
      },
       {
        title: 'Last Update Date',
        data: 'LAST_UPD_DT'
      },     
       {
        title: 'Last Update By',
        data: 'LAST_UPD_BY'
      }, {
        title: 'Checked Date',
        data: 'CHECKED_DT',
      },       
       {
        title: 'Checker ID',
        data: 'CHECKER_ID',
      }, 
      {
        title: 'Member Type',
        data: 'MEMBER_TYPE'
      },
     {
        title: 'Expension Market Region',
        data: 'EXPN_MKT_RGN_CD'
      }]
    }
  }
  ngOnChanges() {

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.clear().draw();
                dtInstance.rows.add(this.myTableData).draw();
            });
          });
  }

   public setup(myData: any = []) {
    this.myTableData = myData;
    this.rerender();
   }

}

