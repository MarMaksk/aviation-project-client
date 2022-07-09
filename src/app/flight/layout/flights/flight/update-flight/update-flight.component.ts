import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../../user/service/notification.service";
import {FlightService} from "../../../../service/flight.service";
import {AirplaneService} from "../../../../service/airplane.service";
import {AirportService} from "../../../../service/airport.service";
import {Airplane} from "../../../../models/airplane";
import {Airport} from "../../../../models/airport";
import {FlightStatus} from "../../../../models/enums/flight-status";
import {enumValues} from "../../../../../util/enum-values";

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {

  public updateForm: FormGroup | any;
  airplane: Airplane[] | any;
  airport: Airport[] | any;
  isDataLoadedAirplane = false;
  isDataLoadedAirport = false;
  lastAirplane: Airplane | any
  airLoad = false;
  status = FlightStatus
  enumValues = enumValues

  readonly equalsByIata = this.airplaneService.equalsByIata;

  constructor(private dialogRef: MatDialogRef<UpdateFlightComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private flightService: FlightService,
              private airplaneService: AirplaneService,
              private airportService: AirportService) {
  }

  ngOnInit(): void {
    this.airplaneService.find(this.data.flight.iataCode)
      .subscribe(data => {
        this.lastAirplane = data
        this.airLoad = true
      })
    this.updateForm = this.createUpdateForm()
    this.airplaneService.findAllNoBusy()
      .subscribe(data => {
        this.airplane = data
        this.isDataLoadedAirplane = true
      }, error => this.notification.showSnackBar(
        "При получении доступных самолётов произошла ошибка"
      ))
    this.airportService.findAll()
      .subscribe(data => {
        this.airport = data
        this.isDataLoadedAirport = true
      }, error => this.notification.showSnackBar(
        "При получении доступных аэропортов произошла ошибка"
      ))
  }

  createUpdateForm(): FormGroup {
    return this.fb.group({
        icaoCode: [this.data.flight.icaoCode, Validators.compose([Validators.required])],
        departure: [this.data.flight.departure, Validators.compose([Validators.required])],
        flightTime: [this.data.flight.flightTime, Validators.compose([Validators.required])],
        passengersCount: [this.data.flight.passengersCount, Validators.compose([Validators.required])],
        ticketPrice: [this.data.flight.ticketPrice, Validators.compose([Validators.required])],
        iataCodeDeparture: [this.data.flight.iataCodeDeparture, Validators.compose([Validators.required])],
        iataCodeArrival: [this.data.flight.iataCodeArrival, Validators.compose([Validators.required])],
        status: [this.data.flight.status, Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.flightService.update({
      icaoCode: this.updateForm.value.icaoCode,
      flightNumber: this.data.flight.flightNumber,
      departure: this.updateForm.value.departure,
      flightTime: this.updateForm.value.flightTime,
      passengersCount: this.updateForm.value.passengersCount,
      ticketPrice: this.updateForm.value.ticketPrice,
      iataCodeDeparture: this.updateForm.value.iataCodeDeparture,
      iataCodeArrival: this.updateForm.value.iataCodeArrival,
      status: this.updateForm.value.status
    })
      .subscribe(() => {
        this.notification.showSnackBar("Полёт обновлён")
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произшла ошибка при обновлении полёта"))
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
