import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../service/util.service";
import {FlightStatus} from "../../../models/enums/flight-status";
import {enumValues} from 'src/app/util/enum-values';
import {enumCompare} from "../../../../util/enum-compare";
import {FlightService} from "../../../service/flight.service";

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
  status = FlightStatus
  enumValues = enumValues

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<CheckDeliveryComponent>,
              private fb: FormBuilder,
              private util: UtilService,
              private flightService: FlightService
  ) {
  }

  ngOnInit(): void {
    this.util.checkStatus(this.data.flight.productOrderId)
      .subscribe(data => {
        this.deliveryStatus = enumCompare(data.toString())
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
    this.flightService.update({
      flightNumber: this.data.flight.flightNumber,
      iataCode: this.data.flight.iataCode,
      icaoCodeArrival: this.data.flight.icaoCodeArrival,
      icaoCodeDeparture: this.data.flight.icaoCodeDeparture,
      status: this.deliveryForm.value.status
    })
      .subscribe(() => {
        this.notification.showSnackBar("Полёт обновлён")
        this.dialogRef.close()
        window.location.reload();
      }, error => this.notification.showSnackBar("Произшла ошибка при обновлении полёта"))
  }

  private createDeliveryForm() {
    return this.fb.group({
        status: [this.data.flight.status, Validators.compose([Validators.required])]
      }
    )
  }
}
