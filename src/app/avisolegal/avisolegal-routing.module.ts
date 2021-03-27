import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisolegalPage } from './avisolegal.page';

const routes: Routes = [
  {
    path: '',
    component: AvisolegalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisolegalPageRoutingModule {}
