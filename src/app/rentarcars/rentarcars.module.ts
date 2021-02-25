import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentarcarsPageRoutingModule } from './rentarcars-routing.module';

import { RentarcarsPage } from './rentarcars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentarcarsPageRoutingModule
  ],
  declarations: [RentarcarsPage]
})
export class RentarcarsPageModule {}
