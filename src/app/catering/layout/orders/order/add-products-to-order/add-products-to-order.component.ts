import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../../../models/order";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../../../models/product";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../../../service/order.service";
import {ProductService} from "../../../../service/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NotificationService} from "../../../../../user/service/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-add-products-to-order',
  templateUrl: './add-products-to-order.component.html',
  styleUrls: ['./add-products-to-order.component.css']
})
export class AddProductsToOrderComponent implements OnInit {

  displayedColumns: string[] = ['select', 'code', 'name', 'expirationDate', 'tags'];
  dataSource: MatTableDataSource<Product> | any;
  selection = new SelectionModel<Product>(true, []);
  isDataLoadedProducts = false

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddProductsToOrderComponent>,
              private productService: ProductService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.productService.findAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.isDataLoadedProducts = true
        this.dataSource.data.forEach((row: Product) => {
          for (let i = 0; i < this.data.order.products.length; i++)
            if (row.code === this.data.order.products[i].code)
              this.selection.select(row);
        });
      }, error => this.notification.showSnackBar("При получении продуктов произошла ошибка"))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  submit(): void {
    this.data.order.products = this.selection.selected
    this.orderService.update(this.data.order)
      .subscribe(() => {
        this.notification.showSnackBar("Обновлено")
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произошла ошибка"))
  }

  closeDialog() {
    this.dialogRef.close()
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

  toggle(row: Product) {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row)
    } else {
      this.selection.select(row)
    }
  }
}
