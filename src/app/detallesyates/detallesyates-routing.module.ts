import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesyatesPage } from './detallesyates.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesyatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesyatesPageRoutingModule {}
