import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { settlementDashboardComponent } from './settlementDashboard.component';

const routes: Routes = [
  {
    path: '',
    component: settlementDashboardComponent,
    data: {
      title: 'settlement Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartJSRoutingModule {}
