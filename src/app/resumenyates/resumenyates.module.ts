import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenyatesPageRoutingModule } from './resumenyates-routing.module';

import { ResumenyatesPage } from './resumenyates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenyatesPageRoutingModule
  ],
  declarations: [ResumenyatesPage]
})
export class ResumenyatesPageModule {}
