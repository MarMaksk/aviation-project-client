import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {ExaminationService} from "../../../service/examination.service";

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.css']
})
export class AddExaminationComponent implements OnInit {

  public addForm: FormGroup | any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddExaminationComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              private examinationService: ExaminationService
  ) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm()
  }

  createAddForm(): FormGroup {
    return this.fb.group({
        description: ['', Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.examinationService.create({
      description: this.addForm.value.description,
      icaoCode: this.data.airplane.icaoCode
    })
      .subscribe(() => {
        this.notification.showSnackBar("Добавлено")
        this.dialogRef.close()
      }, error => this.notification.showSnackBar("Произошла ошибка"))
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
