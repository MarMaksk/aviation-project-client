import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Airport} from "../../models/airport";
import {AirportService} from "../../service/airport.service";
import {AddAirportComponent} from "./add-airport/add-airport.component";
import {PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  displayedColumns: string[] = ['country', 'city', 'icaoCode'];
  page: number = 0;
  size: number = 4;
  totalCount: number = 0;
  isDataLoaded = false;

  currentSort = {
    active: 'country',
    direction: 'asc'
  }

  airports: Airport[] = [];

  constructor(private airportService: AirportService,
              private notification: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.refreshAirportsTable(this.page, this.size);
  }

  loadAirports(event: PageEvent): PageEvent {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.refreshAirportsTable(this.page, this.size);
    return event;
  }

  applySort(sort: MatSort | any) {
    this.currentSort = sort
    this.refreshAirportsTable(this.page, this.size);
  }

  private refreshAirportsTable(page: number, size: number): void {
    this.airports = [];
    this.airportService.findAllWithPagination(this.currentSort.active, this.currentSort.direction, size, page)
      .subscribe(data => {
        this.totalCount = data.totalElements
        this.airports = data.content;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении аэропортов произошла ошибка"))
  }

  addAirport(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    this.dialog.open(AddAirportComponent, dialogConfig)
  }
}
