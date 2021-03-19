import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TusreservasPageRoutingModule } from './tusreservas-routing.module';

import { TusreservasPage } from './tusreservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TusreservasPageRoutingModule
  ],
  declarations: [TusreservasPage]
})
export class TusreservasPageModule {}
