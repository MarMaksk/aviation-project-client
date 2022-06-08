import {Component, OnInit} from '@angular/core';
import {Flight} from "../../models/flight";
import {User} from "../../../user/models/user";
import {FlightService} from "../../service/flight.service";
import {UserService} from "../../../user/service/user.service";
import {NotificationService} from "../../../user/service/notification.service";
import {ExaminationService} from "../../service/examination.service";
import {AirplaneService} from "../../service/airplane.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddFlightComponent} from "./add-flight/add-flight.component";
import {CheckDeliveryComponent} from "./check-delivery/check-delivery.component";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights: Flight[] | any;
  user: User | any;
  isFlightsLoaded = false
  isUserDataLoaded = false;

  constructor(
    private flightService: FlightService,
    private userService: UserService,
    private notificationService: NotificationService,
    private examinationService: ExaminationService,
    private airplaneService: AirplaneService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.flightService.findAllFlight()
      .subscribe(data => {
        console.log(data);
        this.flights = data;
        this.isFlightsLoaded = true;
      })
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  addFlight(): void {
    const dialogFlightEditConfig = new MatDialogConfig();
    dialogFlightEditConfig.width = '470px'
    this.dialog.open(AddFlightComponent, dialogFlightEditConfig)
  }

  checkDelivery(flight: Flight) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    dialogConfig.data = {
      flight: flight
    }
    this.dialog.open(CheckDeliveryComponent, dialogConfig)
  }
}
