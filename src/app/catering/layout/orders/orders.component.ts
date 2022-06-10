import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddAirportComponent} from "../../../flight/layout/airports/add-airport/add-airport.component";
import {Order} from "../../models/order";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['icaoCode', 'iataCode', 'lastDate', 'deliveryTime', 'status'];
  page: number = 0;
  size: number = 4;
  totalCount: number = 0;
  isDataLoaded = false;

  currentSort = {
    active: 'lastDate',
    direction: 'asc'
  }

  orders: Order[] = [];

  constructor(private orderService: OrderService,
              private notification: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refreshOrdersTable(this.page, this.size);
  }

  loadOrders(event: PageEvent): PageEvent {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.refreshOrdersTable(this.page, this.size);
    return event;
  }

  applySort(sort: MatSort | any) {
    this.currentSort = sort
    this.refreshOrdersTable(this.page, this.size);
  }

  private refreshOrdersTable(page: number, size: number): void {
    this.orders = [];
    this.orderService.findAllWithPagination(this.currentSort.active, this.currentSort.direction, size, page)
      .subscribe(data => {
        console.log(data)
        this.totalCount = data.totalElements
        this.orders = data.content;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении заказов на доставку произошла ошибка"))
  }

  addOrder(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px'
    this.dialog.open(AddAirportComponent, dialogConfig)
  }
}