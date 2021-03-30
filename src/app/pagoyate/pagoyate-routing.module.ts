import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoyatePage } from './pagoyate.page';

const routes: Routes = [
  {
    path: '',
    component: PagoyatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoyatePageRoutingModule {}
