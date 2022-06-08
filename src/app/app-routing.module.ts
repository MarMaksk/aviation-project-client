import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FlightsComponent} from "./flight/layout/flights/flights.component";
import {FlightComponent} from "./flight/layout/flights/flight/flight.component";
import {AirplaneComponent} from "./flight/layout/airplans/airplane.component";
import {AirportsComponent} from "./flight/layout/airports/airports.component";
import {ExaminationsComponent} from "./flight/layout/examinations/examinations.component";
import {RegistrationComponent} from "./user/auth/registration/registration.component";
import {ProfileComponent} from "./user/user/profile/profile.component";
import {LoginComponent} from "./user/auth/login/login.component";
import {AuthGuardService} from "./user/helper/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'flights', component: FlightsComponent, canActivate: [AuthGuardService]},
  {path: 'flights/:flightNumber/:iata/:icaoArrival/:icaoDeparture', component: FlightComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'airplanes', component: AirplaneComponent, canActivate: [AuthGuardService]},
  {path: 'airports', component: AirportsComponent, canActivate: [AuthGuardService]},
  {path: 'examinations', component: ExaminationsComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'flights', pathMatch: 'full'},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
