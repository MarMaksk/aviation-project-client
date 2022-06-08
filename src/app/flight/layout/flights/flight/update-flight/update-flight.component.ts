import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../../user/service/notification.service";
import {UserService} from "../../../../../user/service/user.service";
import {FlightService} from "../../../../service/flight.service";
import {AirplaneService} from "../../../../service/airplane.service";
import {AirportService} from "../../../../service/airport.service";
import {Airplane} from "../../../../models/airplane";
import {Airport} from "../../../../models/airport";
import {UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {

  public updateForm: FormGroup | any;
  airplane: Airplane[] | any;
  airport: Airport[] | any;
  statuses: String[] | any;
  isDataLoadedAirplane = false;
  isDataLoadedAirport = false;
  isStatusesLoaded = false;
  lastRegular = this.data.flight.regular
  lastAirplane: Airplane | any
  airLoad = false;


  constructor(private dialogRef: MatDialogRef<UpdateFlightComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private flightService: FlightService,
              private airplaneService: AirplaneService,
              private airportService: AirportService,
              private utilService: UtilService) {
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
    this.utilService.findAllStatus()
      .subscribe(data => {
        this.statuses = data
        this.isStatusesLoaded = true
      }, error => this.notification.showSnackBar(
        "При получении доступных статусов полёта произошла ошибка"
      ))
  }

  createUpdateForm(): FormGroup {
    let regular = this.data.flight.regular
    console.log(this.data.flight.regular)
    return this.fb.group({
        regular: [regular, Validators.compose([Validators.required])],
        iataCode: [this.data.airplane, Validators.compose([Validators.required])],
        departure: [this.data.flight.departure, Validators.compose([Validators.required])],
        flightTime: [this.data.flight.flightTime, Validators.compose([Validators.required])],
        passengersCount: [this.data.flight.passengersCount, Validators.compose([Validators.required])],
        ticketPrice: [this.data.flight.ticketPrice, Validators.compose([Validators.required])],
        icaoCodeDeparture: [this.data.flight.icaoCodeDeparture, Validators.compose([Validators.required])],
        icaoCodeArrival: [this.data.flight.icaoCodeArrival, Validators.compose([Validators.required])],
        status: [this.data.flight.status, Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    console.log(this.updateForm.value)
    this.flightService.update({
      regular: this.updateForm.value.regular,
      iataCode: this.updateForm.value.iataCode,
      flightNumber: this.data.flight.flightNumber,
      departure: this.updateForm.value.departure,
      flightTime: this.updateForm.value.flightTime,
      passengersCount: this.updateForm.value.passengersCount,
      ticketPrice: this.updateForm.value.ticketPrice,
      icaoCodeDeparture: this.updateForm.value.icaoCodeDeparture,
      icaoCodeArrival: this.updateForm.value.icaoCodeArrival,
      status: this.updateForm.value.status
    })
      .subscribe(() => {
        this.notification.showSnackBar("Полёт обновлён")
        this.dialogRef.close()
        window.location.reload();
      }, error => this.notification.showSnackBar("Произшла ошибка при обновлении полёта"))
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
