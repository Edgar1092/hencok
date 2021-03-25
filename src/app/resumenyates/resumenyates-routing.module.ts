import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenyatesPage } from './resumenyates.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenyatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenyatesPageRoutingModule {}
