import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FlightOrderModule} from "./flight/flight-order.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {CateringModule} from "./catering/catering.module";
import {UserModule} from "./user/user.module";
import {MaterialModule} from "./material.module";
import {NgxPermissionsModule} from "ngx-permissions";
import {NavigationComponent} from "./navigation/navigation.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent, NavigationComponent
  ],
  imports: [
    BrowserModule, FlightOrderModule, BrowserAnimationsModule,
    RouterModule, AppRoutingModule, CateringModule, UserModule, MaterialModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
