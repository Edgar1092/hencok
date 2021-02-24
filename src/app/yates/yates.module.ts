import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YatesPageRoutingModule } from './yates-routing.module';

import { YatesPage } from './yates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YatesPageRoutingModule
  ],
  declarations: [YatesPage]
})
export class YatesPageModule {}
