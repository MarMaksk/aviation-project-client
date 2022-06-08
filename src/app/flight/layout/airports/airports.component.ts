import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Airport} from "../../models/airport";
import {AirportService} from "../../service/airport.service";
import {AddAirportComponent} from "./add-airport/add-airport.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  airports: Airport[] | any;
  isDataLoadedAirports = false;
  displayedColumns: string[] = ['icaoCode', 'country', 'city'];
  dataSource: MatTableDataSource<Airport> | any;

  // totalLength: number | any
  // page = 1

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(private notification: NotificationService,
              private airportService: AirportService,
              private dialog: MatDialog) {
    this.airportService.findAll()
      .subscribe(data => {
        this.airports = data
        this.isDataLoadedAirports = true
        // this.totalLength = data.length
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data)
      }, error => this.notification.showSnackBar(
        "При получении аэропортов произошла ошибка"
      ))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    // this.airportService.findAll()
    //   .subscribe(data => {
    //     this.airports = data
    //     this.isDataLoadedAirports = true
    //   }, error => this.notification.showSnackBar('При получении аэропортов произошла ошибка'))
  }

  addAirport(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    this.dialog.open(AddAirportComponent, dialogConfig)
  }

}
