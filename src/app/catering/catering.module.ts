import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateringComponent } from './catering.component';
import {NavigationCateringComponent} from "./layout/navigation/navigation-catering.component";
import {MaterialModule} from "../material.module";
import { OrdersComponent } from './layout/orders/orders.component';
import { AddOrderComponent } from './layout/orders/add-order/add-order.component';
import { UpdateOrderComponent } from './layout/orders/update-order/update-order.component';


@NgModule({
  declarations: [
    CateringComponent,
    NavigationCateringComponent,
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
