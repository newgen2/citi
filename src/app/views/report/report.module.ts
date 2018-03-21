import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    BsDropdownModule,
    DataTablesModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
