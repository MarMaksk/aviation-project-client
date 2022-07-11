import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {ExaminationService} from "../../service/examination.service";
import {Examination} from "../../models/examination";
import {PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit{

  examinations: Examination[] | any
  isDataLoaded = false
  displayedColumns: string[] = ['date', 'description', 'icaoCode'];
  page: number = 0;
  size: number = 4;
  totalCount: number = 0;
  currentSort = {
    active: 'date',
    direction: 'asc'
  }
  constructor(private notification: NotificationService,
              private examinationService: ExaminationService) {
  }

  ngOnInit(): void {
    this.refreshExaminationTable(this.page, this.size);
  }

  loadExamination(event: PageEvent): PageEvent {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.refreshExaminationTable(this.page, this.size);
    return event;
  }

  applySort(sort: MatSort | any) {
    this.currentSort = sort
    this.refreshExaminationTable(this.page, this.size);
  }

  private refreshExaminationTable(page: number, size: number): void {
    this.examinations = [];
    this.examinationService.findAllWithPagination(this.currentSort.active, this.currentSort.direction, size, page)
      .subscribe(data => {
        this.totalCount = data.totalElements
        this.examinations = data.content;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении обслуживания произошла ошибка"))
  }
}
