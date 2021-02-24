import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YatesPage } from './yates.page';

const routes: Routes = [
  {
    path: '',
    component: YatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YatesPageRoutingModule {}
