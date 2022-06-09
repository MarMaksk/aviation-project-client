import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Airport} from "../../models/airport";
import {AirportService} from "../../service/airport.service";
import {AddAirportComponent} from "./add-airport/add-airport.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {BehaviorSubject, combineLatest, map, Observable, switchMap} from "rxjs";
import {AirplaneService} from "../../service/airplane.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  // airports: Airport[] | any;
  // isDataLoadedAirports = false;
  // displayedColumns: string[] = ['icaoCode', 'country', 'city'];
  // dataSource: MatTableDataSource<Airport> | any;
  //
  // // totalLength: number | any
  // // page = 1
  //
  // @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // @ViewChild(MatSort) sort: MatSort | any;
  //
  //
  // constructor(private notification: NotificationService,
  //             private airportService: AirportService,
  //             private dialog: MatDialog) {
  //   this.airportService.findAll()
  //     .subscribe(data => {
  //       this.airports = data
  //       this.isDataLoadedAirports = true
  //       // this.totalLength = data.length
  //       this.dataSource = new MatTableDataSource(data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       console.log(data)
  //     }, error => this.notification.showSnackBar(
  //       "При получении аэропортов произошла ошибка"
  //     ))
  // }
  //
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  //
  // ngOnInit(): void {
  //   // this.airportService.findAll()
  //   //   .subscribe(data => {
  //   //     this.airports = data
  //   //     this.isDataLoadedAirports = true
  //   //   }, error => this.notification.showSnackBar('При получении аэропортов произошла ошибка'))
  // }
  //
  // addAirport(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '400px'
  //   this.dialog.open(AddAirportComponent, dialogConfig)
  // }

  // displayedColumns: string[] = ['icaoCode', 'country', 'city'];
  // airportService: AirportService | any;
  // airports: Observable<Airport> | any;
  //
  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;
  // pageSize = 10;
  // currentPage = new BehaviorSubject<number>(1);
  // currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  //
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | any;
  // @ViewChild(MatSort, {static: false}) sort: MatSort = {} as MatSort;
  //
  // constructor(private _httpClient: HttpClient,
  //             private notification: NotificationService) {
  // }
  //
  // ngOnInit() {
  //   this.airportService = new AirportService(this._httpClient);
  //
  //   // If the user changes the sort order, reset back to the first page.
  //   // this.sort.sortChange.subscribe(() => this.currentPage.next(1));
  //
  //
  //   this.airports = combineLatest(this.currentSort, this.currentPage)
  //     .pipe(
  //       // startWith([undefined, ]),
  //       switchMap(([sortChange, currentPage]) => {
  //         this.isLoadingResults = true;
  //         console.log(this.sort.direction)
  //         return this.airportService.findAllWithPagination(
  //           'country', '5', currentPage);
  //       }),
  //       map((data: any) => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         // this.resultsLength = data.total_count;
  //         this.airports = data
  //         return data;
  //       }),
  //       // @ts-ignore
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         this.notification.showSnackBar("Ошибка при получении аэропортов")
  //       })
  //     );
  // }
  //
  // changePage(pageNumber: number): void {
  //   console.log('true')
  //   console.log(pageNumber)
  //   this.currentPage.next(pageNumber);
  //   this.airports = combineLatest(this.currentSort, this.currentPage)
  //     .pipe(
  //       // startWith([undefined, ]),
  //       switchMap(([sortChange, currentPage]) => {
  //         console.log(this.sort.direction)
  //         return this.airportService.findAllWithPagination(
  //           'country', '5', currentPage);
  //       }),
  //       map((data: any) => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.airports = data
  //         return data;
  //       }),
  //       // @ts-ignore
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         this.notification.showSnackBar("Ошибка при получении аэропортов")
  //       })
  //     );
  // }
  //
  // applySort(sort: MatSort | any) {
  //   this.currentSort.next(sort);
  // }
  //
  // createRange(number: number) {
  //   let items: number[] = [];
  //   let limit = this.resultsLength / this.pageSize;
  //   for (let i = 1; i <= limit; i++) {
  //     items.push(i);
  //   }
  //   return items;
  // }


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
        console.log(data)
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
