import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateringComponent } from './catering.component';


@NgModule({
  declarations: [
    CateringComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CateringComponent]
})
export class CateringModule { }
