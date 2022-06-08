import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FlightOrderModule} from "./flight/flight-order.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {CateringModule} from "./catering/catering.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FlightOrderModule, BrowserAnimationsModule,
    RouterModule, CateringModule, UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
