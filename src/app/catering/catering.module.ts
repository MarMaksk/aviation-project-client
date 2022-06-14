import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CateringComponent} from './catering.component';
import {MaterialModule} from "../material.module";
import {OrdersComponent} from './layout/orders/orders.component';
import {UpdateOrderComponent} from './layout/orders/order/update-order/update-order.component';
import {OrderComponent} from './layout/orders/order/order.component';
import {AppRoutingModule} from "../app-routing.module";
import {AddProductsToOrderComponent} from './layout/orders/order/add-products-to-order/add-products-to-order.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import { ProductsComponent } from './layout/products/products.component';
import { AddProductsComponent } from './layout/products/add-products/add-products.component';


@NgModule({
  declarations: [
    CateringComponent,
    OrdersComponent,
    UpdateOrderComponent,
    OrderComponent,
    AddProductsToOrderComponent,
    ProductsComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  exports: [CateringComponent]
})
export class CateringModule {
}
