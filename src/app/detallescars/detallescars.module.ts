import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallescarsPageRoutingModule } from './detallescars-routing.module';

import { DetallescarsPage } from './detallescars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallescarsPageRoutingModule
  ],
  declarations: [DetallescarsPage]
})
export class DetallescarsPageModule {}
