import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoyatePageRoutingModule } from './pagoyate-routing.module';

import { PagoyatePage } from './pagoyate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoyatePageRoutingModule
  ],
  declarations: [PagoyatePage]
})
export class PagoyatePageModule {}
