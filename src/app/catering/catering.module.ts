import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateringComponent } from './catering.component';
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {MaterialModule} from "../material.module";
import { OrdersComponent } from './layout/orders/orders.component';
import { AddOrderComponent } from './layout/orders/add-order/add-order.component';
import { UpdateOrderComponent } from './layout/orders/update-order/update-order.component';


@NgModule({
  declarations: [
    CateringComponent,
    NavigationComponent,
    OrdersComponent,
    AddOrderComponent,
    UpdateOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CateringComponent]
})
export class CateringModule { }
