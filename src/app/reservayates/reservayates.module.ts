import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservayatesPageRoutingModule } from './reservayates-routing.module';

import { ReservayatesPage } from './reservayates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservayatesPageRoutingModule
  ],
  declarations: [ReservayatesPage]
})
export class ReservayatesPageModule {}
