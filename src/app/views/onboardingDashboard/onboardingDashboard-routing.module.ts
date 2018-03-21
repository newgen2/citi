import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { onboardingDashboardComponent } from './onboardingDashboard.component';

const routes: Routes = [
  {
    path: '',
    component: onboardingDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
