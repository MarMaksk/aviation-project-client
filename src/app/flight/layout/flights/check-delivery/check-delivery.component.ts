import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../service/util.service";

@Component({
  selector: 'app-check-delivery',
  templateUrl: './check-delivery.component.html',
  styleUrls: ['./check-delivery.component.css']
})
export class CheckDeliveryComponent implements OnInit {

  public deliveryForm: FormGroup | any;
  isDataLoadedStatuses = false
  isDataLoadedDelivery = false
  statuses: string[] | any
  deliveryStatus: string | any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<CheckDeliveryComponent>,
              private fb: FormBuilder,
              private util: UtilService
  ) {
  }

  ngOnInit(): void {
    this.util.checkStatus(this.data.flight.productOrderId)
      .subscribe(data => {
        console.log(data)
        this.deliveryStatus = data
        this.isDataLoadedDelivery = true
      }, error => this.notification.showSnackBar("Не найден статус"));
    this.util.findAllStatus()
      .subscribe(data => {
        this.statuses = data
        this.isDataLoadedStatuses = true
      }, error => this.notification.showSnackBar(
        "При получении доступных статусов полёта произошла ошибка"
      ))
    this.deliveryForm = this.createDeliveryForm();
  }

  closeDialog() {
    this.dialogRef.close()
  }

  submit() {

  }

  private createDeliveryForm() {
    return this.fb.group({
        status: [this.data.flight.status, Validators.compose([Validators.required])]
      }
    )
  }
}
