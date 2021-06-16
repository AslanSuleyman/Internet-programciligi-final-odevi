import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationsRoutingModule } from './animations-routing.module';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    AnimationsRoutingModule,
    MatMenuModule,
  ],
  declarations: [HomeComponent]
})
export class AnimationsModule { }
