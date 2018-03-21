import { AfterViewInit, Component, OnInit, OnChanges, ViewChild, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SessionService } from '../../common-service/session.service';

@Component({
  selector: 'aov-datatable',
  templateUrl: 'AOVDatatable.component.html'
})
export class AOVDatatableComponent implements OnInit, AfterViewInit, OnChanges {
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
        title: 'Relation Number',
        data: 'RELN_NBR'
      },
      {
        title: 'Banker Name',
        data: 'Banker_NM'
      }, {
        
        title: 'Account Search Number',
        data: 'ACCT_SRCH_NBR'
      },
       {
        title: 'Account Description',
        data: 'ACCT_DESC'
      },     
       {
        title: 'Account Opening Date',
        data: 'ACCT_OPEN_DT'
      }
     ]
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

