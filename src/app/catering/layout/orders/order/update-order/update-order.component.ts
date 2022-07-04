import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../service/order.service";
import {NotificationService} from "../../../../../user/service/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {enumValues} from 'src/app/util/enum-values';
import {DeliveryStatus} from "../../../../../util/enums/delivery-status";
import {enumCompare} from "../../../../../util/enum-compare";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  public deliveryForm: FormGroup | any;
  deliveryStatus: string | any
  status = DeliveryStatus
  enumValues = enumValues

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateOrderComponent>,
              private fb: FormBuilder,
              private orderService: OrderService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.deliveryStatus = enumCompare(this.data.status)
    this.deliveryForm = this.createDeliveryForm()
  }

  closeDialog() {
    this.dialogRef.close()
  }

  submit() {
    this.data.order.deliveryTime = this.deliveryForm.value.deliveryTime
    if (this.deliveryForm.value.deliveryTime > this.data.order.lastDate) {
      this.notification.showSnackBar(`Крайний срок поставки: ${this.data.order.lastDate}.
      Сроки поставки просрочены. Статус установлен: просрочена`)
      this.data.order.status = "Просрочена"
    } else
      this.data.order.status = this.deliveryForm.value.status

    this.orderService.update(this.data.order)
      .subscribe(() => {
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произшла ошибка при обновлении полёта"))
  }

  private createDeliveryForm() {
    return this.fb.group({
        status: [this.data.order.status, Validators.compose([Validators.required])],
        deliveryTime: [this.data.order.deliveryTime, Validators.compose([Validators.required])]
      }
    )
  }

}
