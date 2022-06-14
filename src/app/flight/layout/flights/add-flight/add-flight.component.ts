import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../user/service/notification.service";
import {FlightService} from "../../../service/flight.service";
import {AirplaneService} from "../../../service/airplane.service";
import {AirportService} from "../../../service/airport.service";
import {Flight} from "../../../models/flight";
import {Airplane} from "../../../models/airplane";
import {Airport} from "../../../models/airport";

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  public addForm: FormGroup | any;
  flight: Flight | any;
  airplane: Airplane[] | any;
  airport: Airport[] | any;
  isDataLoadedAirplane = false;
  isDataLoadedAirport = false;
  date = new Date()

  constructor(private dialogRef: MatDialogRef<AddFlightComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              private flightService: FlightService,
              private airplaneService: AirplaneService,
              private airportService: AirportService) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
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

  createAddForm(): FormGroup {
    return this.fb.group({
        regular: ['', Validators.compose([Validators.required])],
        iataCode: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
        departure: ['', Validators.compose([Validators.required])],
        flightTime: ['', Validators.compose([Validators.required])],
        passengersCount: ['', Validators.compose([Validators.required])],
        ticketPrice: ['', Validators.compose([Validators.required])],
        icaoCodeDeparture: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
        icaoCodeArrival: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      }
    )
  }

  submit(): void {
    console.log(this.addForm.value)
    this.flightService.create({
      regular: this.addForm.value.regular,
      iataCode: this.addForm.value.iataCode,
      flightNumber: this.addForm.value.iataCode + this.addForm.value.icaoCodeArrival,
      departure: this.addForm.value.departure,
      flightTime: this.addForm.value.flightTime,
      passengersCount: this.addForm.value.passengersCount,
      ticketPrice: this.addForm.value.ticketPrice,
      icaoCodeDeparture: this.addForm.value.icaoCodeDeparture,
      icaoCodeArrival: this.addForm.value.icaoCodeArrival
    })
      .subscribe(() => {
        this.notification.showSnackBar("Полёт создан")
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произошла ошибка при создание полёта"))
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
