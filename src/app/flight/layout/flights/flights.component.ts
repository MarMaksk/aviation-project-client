import {Component, Input, OnInit} from '@angular/core';
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
import {NgxPermissionsService} from "ngx-permissions";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {FlightStatus} from "../../models/enums/flight-status";
import {enumValues} from 'src/app/util/enum-values';
import {AlternativeFlightsComponent} from "./alternative-flights/alternative-flights.component";

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
  status = FlightStatus
  enumValues = enumValues
  changeStatus = '';
  newStatus: string | any


  constructor(
    private flightService: FlightService,
    private userService: UserService,
    private notificationService: NotificationService,
    private examinationService: ExaminationService,
    private airplaneService: AirplaneService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.flightService.findAllFlight()
      .subscribe(data => {
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

  alternativeFlight(flightNumber: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px'
    dialogConfig.data = {
      flightNumber: flightNumber
    }
    this.dialog.open(AlternativeFlightsComponent, dialogConfig)
  }

  showChangeStatus(flightNumber: string) {
    this.changeStatus = flightNumber
  }

  submitChangeStatus() {
    let flight = this.flights.find((x: { flightNumber: string; }) => x.flightNumber == this.changeStatus)
    flight.status = this.newStatus
    this.flightService.update(flight).subscribe(() => this.notificationService.showSnackBar('Статус обновлён'),
      error => this.notificationService.showSnackBar('Ошибка'))
    this.changeStatus = ''
  }

  delete(flightNumber: string) {
    this.flightService.delete(flightNumber).subscribe(() =>
        this.notificationService.showSnackBar("Успешно удалено"),
      error => this.notificationService.showSnackBar("Ошибка"))
  }
}
