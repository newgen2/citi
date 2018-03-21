import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPrefComponent } from './userpref.component';

const routes: Routes = [
  {
    path: '',
    component: UserPrefComponent,
    data: {
      title: 'userpref'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPrefRoutingModule {}
