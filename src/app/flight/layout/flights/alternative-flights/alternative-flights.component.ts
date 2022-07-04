import {Component, Inject, OnInit} from '@angular/core';
import {Flight} from "../../../models/flight";
import {FlightService} from "../../../service/flight.service";
import {NotificationService} from "../../../../user/service/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alternative-flights',
  templateUrl: './alternative-flights.component.html',
  styleUrls: ['./alternative-flights.component.css']
})
export class AlternativeFlightsComponent implements OnInit {

  choose: Flight | any;
  flights: Flight[] = [];

  constructor(private flightService: FlightService,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AlternativeFlightsComponent>) {
  }

  ngOnInit(): void {
    this.flightService.findAlternativeFlights(this.data.flightNumber)
      .subscribe(data => {
        this.flights = data
      }, error => this.notification.showSnackBar("Произошла ошибка"))
  }

  submit(): void {
    this.flightService.selectAlternativeFlight(this.data.flightNumber, this.choose.flightNumber)
      .subscribe(data => {
        this.notification.showSnackBar('Альтернативный рейс выбран')
      }, error => this.notification.showSnackBar('Ошибка при выборе рейса'))
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
