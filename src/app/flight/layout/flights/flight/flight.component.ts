import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FlightService} from "../../../service/flight.service";
import {Flight} from "../../../models/flight";
import {Airplane} from "../../../models/airplane";
import {Airport} from "../../../models/airport";
import {AirportService} from "../../../service/airport.service";
import {AirplaneService} from "../../../service/airplane.service";
import {NotificationService} from "../../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateFlightComponent} from "./update-flight/update-flight.component";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  isDataLoadedFlight = false;
  isDataLoadedAirplane = false;
  isDataLoadedAirportArr = false;
  isDataLoadedAirportDep = false;
  errors = ``;
  flight: Flight | any;
  airplane: Airplane | any;
  arrAirport: Airport | any;
  depAirport: Airport | any;

  constructor(private route: ActivatedRoute,
              private flightService: FlightService,
              private airportService: AirportService,
              private airplaneService: AirplaneService,
              private notificationService: NotificationService,
              private dialog: MatDialog
              ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flightService.find(params['flightNumber'])
        .subscribe(data => {
          this.flight = data
          this.isDataLoadedFlight = true
        }, error =>
          this.errors = this.errors + 'Информация о полёте не загружена.\n')
      this.airplaneService.find(params['iata'])
        .subscribe(data => {
          this.airplane = data
          this.isDataLoadedAirplane = true;
        }, error =>
          this.errors = this.errors + 'Информация о самолёте не загружена.\n')
      this.arrAirport = this.airportService.find(params['icaoArrival'])
        .subscribe(data => {
        this.arrAirport = data
        this.isDataLoadedAirportArr = true;
      }, error =>
        this.errors = this.errors + 'Информация об аэропорте прибытия не загружена.\n')
      this.depAirport = this.airportService.find(params['icaoDeparture']).subscribe(data => {
        this.depAirport = data
        this.isDataLoadedAirportDep = true;
      }, error =>
        this.errors = this.errors + 'Информация об аэропорте вылета не загружена.\n')
    })
  }

  updateFlight() {
    const dialogFlightEditConfig = new MatDialogConfig();
    dialogFlightEditConfig.width = '400px'
    dialogFlightEditConfig.data = {
      flight: this.flight,
      airplane: this.airplane
    }
    this.dialog.open(UpdateFlightComponent, dialogFlightEditConfig)
  }
}
