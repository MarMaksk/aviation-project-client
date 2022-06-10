import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightOrderComponent} from "./flight-order.component";
import {AddAirplaneComponent} from "./layout/airplans/add-airplane/add-airplane.component";
import {AirplaneComponent} from "./layout/airplans/airplane.component";
import {AddExaminationComponent} from "./layout/airplans/add-examination/add-examination.component";
import {AirportsComponent} from "./layout/airports/airports.component";
import {AddAirportComponent} from "./layout/airports/add-airport/add-airport.component";
import {UpdateFlightComponent} from "./layout/flights/flight/update-flight/update-flight.component";
import {FlightsComponent} from "./layout/flights/flights.component";
import {AddFlightComponent} from "./layout/flights/add-flight/add-flight.component";
import {CheckDeliveryComponent} from "./layout/flights/check-delivery/check-delivery.component";
import {ExaminationsComponent} from "./layout/examinations/examinations.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FlightComponent} from "./layout/flights/flight/flight.component";
import {NgxPermissionsModule} from "ngx-permissions";


@NgModule({
  declarations: [FlightOrderComponent,
    NavigationComponent,
    FlightsComponent,
    FlightComponent,
    AddFlightComponent,
    UpdateFlightComponent,
    CheckDeliveryComponent,
    AirplaneComponent,
    AddAirplaneComponent,
    ExaminationsComponent,
    AddExaminationComponent,
    AirportsComponent,
    AddAirportComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPermissionsModule
  ],
  exports: [FlightOrderComponent]
})
export class FlightOrderModule {
}
