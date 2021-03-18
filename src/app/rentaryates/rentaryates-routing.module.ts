import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentaryatesPage } from './rentaryates.page';

const routes: Routes = [
  {
    path: '',
    component: RentaryatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentaryatesPageRoutingModule {}
