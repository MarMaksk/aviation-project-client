import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../user/service/notification.service";
import {AirportService} from "../../../service/airport.service";

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent implements OnInit {

  public addForm: FormGroup | any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddAirportComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              private airportService: AirportService) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm()
  }

  createAddForm(): FormGroup {
    return this.fb.group({
        iataCode: ['', Validators.compose([Validators.required])],
        country: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.airportService.create({
      iataCode: this.addForm.value.iataCode,
      country: this.addForm.value.country,
      city: this.addForm.value.city
    })
      .subscribe(() => {
        this.notification.showSnackBar("Добавлено")
        this.dialogRef.close()
      })
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
