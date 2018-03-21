import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPrefComponent } from './userpref.component';
import { UserPrefRoutingModule } from './userpref-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserPrefRoutingModule,
    BsDropdownModule,
    DataTablesModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [UserPrefComponent]
})
export class UserPrefModule { }
