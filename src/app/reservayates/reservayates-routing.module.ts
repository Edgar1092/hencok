import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservayatesPage } from './reservayates.page';

const routes: Routes = [
  {
    path: '',
    component: ReservayatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservayatesPageRoutingModule {}
