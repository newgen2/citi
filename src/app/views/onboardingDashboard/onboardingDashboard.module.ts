import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { onboardingDashboardComponent } from './onboardingDashboard.component';
import { DashboardRoutingModule } from './onboardingDashboard-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingModule,ANIMATION_TYPES } from 'ngx-loading';
import { LineChartcomponent } from '../d3chart/LineChart.component';
import { BarChartComponent } from '../d3chart/barChart.component';
import { ScaleChartcomponent } from '../d3chart/ScaleChart.component';
import { ScaleChartResizableComponent } from '../d3chart/ScaleChartResizable.component';
import { DiveringStackComponent } from '../d3chart/divering_stack';
import { PieChartComponentV1 } from '../d3chart/pieChart.component_v1';
import { DataTablesModule } from 'angular-datatables';
import { AcctMaintDatatableComponent } from '../datatable/AcctMaintDatatable.component';
import { ChartDatatableComponent } from '../datatable/chartDatatable.component';
import { AOVDatatableComponent } from '../datatable/AOVDatatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    BsDropdownModule,
    DataTablesModule,
    ModalModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBorderRadius: '14px',
      primaryColour: '#3366CC', 
      secondaryColour: '#3366CC', 
      tertiaryColour: '#3366CC'
    })
  ],
  declarations: [AOVDatatableComponent,ChartDatatableComponent, AcctMaintDatatableComponent,onboardingDashboardComponent, LineChartcomponent, BarChartComponent, ScaleChartcomponent, ScaleChartResizableComponent, DiveringStackComponent, PieChartComponentV1]
})
export class onboardingDashboardModule { }
