import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {AirplaneService} from "../../service/airplane.service";
import {ExaminationService} from "../../service/examination.service";
import {Airplane} from "../../models/airplane";
import {Examination} from "../../models/examination";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CheckDeliveryComponent} from "../flights/check-delivery/check-delivery.component";
import {AddAirplaneComponent} from "./add-airplane/add-airplane.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddExaminationComponent} from "./add-examination/add-examination.component";

@Component({
  selector: 'app-airplans',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css'],
  animations: [trigger('detailExpand', [state('collapsed', style({
    height: '0px',
    minHeight: '0'
  })),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),],
})
export class AirplaneComponent implements OnInit {

  airplane: Airplane[] | any;
  displayedColumns = ['iataCode', 'model', 'loadCapacity', 'examination'];
  page: number = 0;
  size: number = 4;
  totalCount: number = 0;
  isDataLoaded = false;
  currentSort = {
    active: 'model',
    direction: 'asc'
  }

  constructor(private notification: NotificationService,
              private airplaneService: AirplaneService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refreshAirplanesTable(this.page, this.size);
  }

  loadAirplanes(event: PageEvent): PageEvent {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.refreshAirplanesTable(this.page, this.size);
    return event;
  }

  applySort(sort: MatSort | any) {
    this.currentSort = sort
    this.refreshAirplanesTable(this.page, this.size);
  }

  private refreshAirplanesTable(page: number, size: number): void {
    this.airplane = [];
    this.airplaneService.findAllWithPagination(this.currentSort.active, this.currentSort.direction, size, page)
      .subscribe(data => {
        console.log(data)
        this.totalCount = data.totalElements
        this.airplane = data.content;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении самолётов произошла ошибка"))
  }

  addAirplane(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    this.dialog.open(AddAirplaneComponent, dialogConfig)
  }

  addExamination(airplane: Airplane): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    dialogConfig.data = {
      airplane: airplane
    }
    this.dialog.open(AddExaminationComponent, dialogConfig)
  }

}
