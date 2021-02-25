import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallescarsPage } from './detallescars.page';

const routes: Routes = [
  {
    path: '',
    component: DetallescarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallescarsPageRoutingModule {}
