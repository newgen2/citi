import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      title: 'report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
