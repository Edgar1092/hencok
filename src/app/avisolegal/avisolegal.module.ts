import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisolegalPageRoutingModule } from './avisolegal-routing.module';

import { AvisolegalPage } from './avisolegal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisolegalPageRoutingModule
  ],
  declarations: [AvisolegalPage]
})
export class AvisolegalPageModule {}
