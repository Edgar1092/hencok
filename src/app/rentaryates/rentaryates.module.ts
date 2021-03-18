import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentaryatesPageRoutingModule } from './rentaryates-routing.module';

import { RentaryatesPage } from './rentaryates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentaryatesPageRoutingModule
  ],
  declarations: [RentaryatesPage]
})
export class RentaryatesPageModule {}
