import { BarChartComponent } from '../d3chart/barChart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})

export class d3chartModule {
}