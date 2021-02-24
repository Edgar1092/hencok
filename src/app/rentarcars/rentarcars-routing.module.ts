import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentarcarsPage } from './rentarcars.page';

const routes: Routes = [
  {
    path: '',
    component: RentarcarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentarcarsPageRoutingModule {}
