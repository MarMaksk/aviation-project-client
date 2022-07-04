import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Product} from "../../models/product";
import {ProductService} from "../../service/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddProductsComponent} from "./add-products/add-products.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'expirationDate', 'tags'];
  page: number = 0;
  size: number = 10;
  totalCount: number = 0;
  isDataLoaded = false;

  currentSort = {
    active: 'code',
    direction: 'asc'
  }

  products: Product[] = [];

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.refreshProductsTable(this.page, this.size);
  }

  loadProducts(event: any): PageEvent {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.refreshProductsTable(this.page, this.size);
    return event;
  }

  applySort(sort: MatSort | any) {
    this.currentSort = sort
    this.refreshProductsTable(this.page, this.size);
  }

  private refreshProductsTable(page: number, size: number): void {
    this.products = [];
    this.productService.findAllWithPagination(this.currentSort.active, this.currentSort.direction, size, page)
      .subscribe(data => {
        this.totalCount = data.totalElements
        this.products = data.content;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении списка продуктов произошла ошибка"))
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'
    this.dialog.open(AddProductsComponent, dialogConfig)
  }
}
