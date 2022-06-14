import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {AirplaneService} from "../../../service/airplane.service";

@Component({
  selector: 'app-add-airplane',
  templateUrl: './add-airplane.component.html',
  styleUrls: ['./add-airplane.component.css']
})
export class AddAirplaneComponent implements OnInit {

  public addForm: FormGroup | any;

  constructor(private dialogRef: MatDialogRef<AddAirplaneComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              private airplaneService: AirplaneService) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm()
  }

  createAddForm(): FormGroup {
    return this.fb.group({
        model: ['', Validators.compose([Validators.required])],
        iataCode: ['', Validators.compose([Validators.required])],
        loadCapacity: ['', Validators.compose([Validators.required])],
      }
    )
  }

  submit(): void {
    console.log(this.addForm.value)
    this.airplaneService.create({
      model: this.addForm.value.model,
      iataCode: this.addForm.value.iataCode,
      loadCapacity: this.addForm.value.loadCapacity
    })
      .subscribe(() => {
        this.notification.showSnackBar("Самолёт добавлен")
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произшла ошибка при добавлении самолёта"))
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
