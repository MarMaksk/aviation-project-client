import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateringComponent } from './catering.component';
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [
    CateringComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CateringComponent]
})
export class CateringModule { }
