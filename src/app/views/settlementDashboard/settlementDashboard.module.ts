import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { settlementDashboardComponent } from './settlementDashboard.component';
import { ChartJSRoutingModule } from './settlementDashboard-routing.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ng2-popover';
import { stackedBarChartcomponent } from '../d3chart/stackedBarChart.component';
import { DoughnutChartComponent } from '../d3chart/doughnutChart.component';
import { PieDrillDownChartComponent } from '../d3chart/pieChartDrillDown.component';
import { PieChartComponent } from '../d3chart/pieChart.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';
import { DatatableComponent } from '../datatable/datatable.component';
import { OrderrByPipe } from '../../common-service/orderby.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartJSRoutingModule,
    BsDropdownModule,
    TooltipModule,
    DataTablesModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBorderRadius: '14px',
      primaryColour: '#3366CC', 
      secondaryColour: '#3366CC', 
      tertiaryColour: '#3366CC'
  }),
    //NgbModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule
  ],
  declarations: [ DatatableComponent, settlementDashboardComponent, stackedBarChartcomponent, DoughnutChartComponent, PieDrillDownChartComponent, PieChartComponent, OrderrByPipe ]
})
export class settlementDashboardModule { }
