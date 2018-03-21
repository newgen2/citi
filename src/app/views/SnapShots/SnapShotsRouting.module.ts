import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnapShotsComponent } from './SnapShots.component';

const routes: Routes = [
  {
    path: '',
    component: SnapShotsComponent,
    data: {
      title: 'SnapShots'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnapShotsRoutingModule {}
