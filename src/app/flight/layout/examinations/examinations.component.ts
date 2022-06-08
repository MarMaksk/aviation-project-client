import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {ExaminationService} from "../../service/examination.service";
import {Examination} from "../../models/examination";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements AfterViewInit{

  examinations: Examination[] | any
  isDataLoaded = false
  displayedColumns: string[] = ['date', 'description', 'iataCode'];
  dataSource: MatTableDataSource<Examination> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(private notification: NotificationService,
              private examinationService: ExaminationService) {
    this.examinationService.findAll()
      .subscribe(data => {
        this.examinations = data
        this.isDataLoaded = true
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => this.notification.showSnackBar(
        "При получении проверок произошла ошибка"
      ))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {

  }
}
