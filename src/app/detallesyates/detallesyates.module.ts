import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesyatesPageRoutingModule } from './detallesyates-routing.module';

import { DetallesyatesPage } from './detallesyates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesyatesPageRoutingModule
  ],
  declarations: [DetallesyatesPage]
})
export class DetallesyatesPageModule {}
