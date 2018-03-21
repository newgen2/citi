import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }from './common-service/auth-guard.service';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export var routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'onboardingDashboard',
        canActivateChild: [AuthGuard],
        loadChildren: './views/onboardingDashboard/onboardingDashboard.module#onboardingDashboardModule'
      },
      {
        path: 'settlementDashboard',
        canActivateChild: [AuthGuard],
        loadChildren: './views/settlementDashboard/settlementDashboard.module#settlementDashboardModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'SnapShots'
    },
    children: [
      {
        path: 'SnapShots',
        canActivateChild: [AuthGuard],
        loadChildren: './views/SnapShots/SnapShots.module#SnapShotsModule',
      },
      {
        path: 'report',
        canActivateChild: [AuthGuard],
        loadChildren: './views/report/report.module#ReportModule',
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'userpref'
    },
    children: [
      {
        path: 'userpref',
        canActivateChild: [AuthGuard],
        loadChildren: './views/userpref/userpref.module#UserPrefModule',
      }
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
