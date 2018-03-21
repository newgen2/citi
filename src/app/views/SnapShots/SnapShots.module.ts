import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnapShotsComponent } from './SnapShots.component';
import { SnapShotsRoutingModule } from './SnapShotsRouting.module';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SnapShotsRoutingModule,
    BsDropdownModule,
    MyDatePickerModule
  ],
  declarations: [SnapShotsComponent]
})
export class SnapShotsModule { }
