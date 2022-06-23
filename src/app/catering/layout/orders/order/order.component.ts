import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../../models/order";
import {Airplane} from "../../../../flight/models/airplane";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Product} from "../../../models/product";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {NotificationService} from "../../../../user/service/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddExaminationComponent} from "../../../../flight/layout/airplans/add-examination/add-examination.component";
import {AddProductsToOrderComponent} from "./add-products-to-order/add-products-to-order.component";
import {SelectionModel} from "@angular/cdk/collections";
import {UpdateOrderComponent} from "./update-order/update-order.component";
import {ReportComponent} from "./report/report.component";
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order | any
  displayedColumns: string[] = ['select', 'code', 'name', 'expirationDate', 'tags'];
  dataSource: MatTableDataSource<Product> | any;
  isDataLoadedOrder = false
  isDataLoadedProducts = false
  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private notification: NotificationService,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orderService.find(params['productOrderId'])
        .subscribe(data => {
          this.order = data
          this.isDataLoadedOrder = true
          this.refresh()
        }, error => this.notification.showSnackBar("Произошла ошибка при получении заказа на доставку"))
    })
  }

  checkStatus(): void {
    if (this.order.status === "Создана") {
      this.order.status = "Обрабатывается"
      this.orderService.update(this.order)
        .subscribe(() => this.notification.showSnackBar('Статус изменён на: обрабатывается'))
    }
    if (this.order.status === "Обрабатывается" && this.order.products.length > 0) {
      this.order.status = "В процессе"
      this.orderService.update(this.order)
        .subscribe(() => this.notification.showSnackBar('Статус изменён на: В процессе'))
    }
  }

  refresh() {
    this.selection = new SelectionModel<Product>(true, []);
    this.checkStatus()
    if (this.order.products?.length) {
      this.dataSource = new MatTableDataSource(this.order.products);
      this.dataSource.sort = this.sort;
      this.isDataLoadedProducts = true
      this.dataSource.data.forEach((row: Product) => {
        for (let i = 0; i < this.order.deliveredProducts.length; i++)
          if (row.code === this.order.deliveredProducts[i].code)
            this.selection.select(row);
      });
    } else {
      this.isDataLoadedProducts = false
      this.notification.showSnackBar("Для данного заказа не найдено продуктов")
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProducts() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'
    dialogConfig.data = {
      order: this.order
    }
    this.dialog.open(AddProductsToOrderComponent, dialogConfig)
  }

  showInvoice() {
    this.reportService.deliverInvoice(this.order.productOrderId)
      .subscribe(data => {
        var fileURL = URL.createObjectURL(data);
        window.open(fileURL);
      }, error => {
        console.log(error)
      })
  }

  showReport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'
    dialogConfig.data = {
      order: this.order
    }
    this.dialog.open(ReportComponent, dialogConfig)
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  changeOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'
    dialogConfig.data = {
      order: this.order
    }
    this.dialog.open(UpdateOrderComponent, dialogConfig)
  }

  toggle(row: Product) {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row)
    } else {
      this.selection.select(row)
    }
  }

  saveStatuses() {
    let deliveredProd = this.order.deliveredProducts = this.selection.selected
    if (deliveredProd.length === this.order.products.length && new Date(this.order.lastDate) < new Date()) {
      this.notification.showSnackBar('Время на доставку истекло. Статус изменён на: просрочена')
      this.order.status = 'Просрочена'
      this.order.deliveryTime = new Date()
    } else if (deliveredProd.length === this.order.products.length) {
      this.notification.showSnackBar("Все продукты доставлены. Статус сменён на: завершена")
      this.order.status = 'Завершена'
      this.order.deliveryTime = new Date()
    }
    this.orderService.update(this.order)
      .subscribe(() => {
      }, error => this.notification.showSnackBar("Ошибка при сохранении"))
  }

  delete() {
    this.orderService.delete(this.order.productOrderId).subscribe(() =>
        this.notification.showSnackBar("Успешно удалено"),
      error => this.notification.showSnackBar("Ошибка при удалении"))
  }
}
