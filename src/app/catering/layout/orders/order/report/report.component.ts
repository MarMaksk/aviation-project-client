import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReportService} from "../../../../service/report.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  pdfDocumentSrc: any;
  isLoaded: boolean = false;
  public reportForm: FormGroup | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ReportComponent>,
              private fb: FormBuilder,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.reportForm = this.createReportForm()
  }

  closeDialog() {
    this.dialogRef.close()
  }

  submit() {
    this.reportService.catererReport(this.data.order.productOrderId,
      this.reportForm.value.responsible,
      this.reportForm.value.email)
      .subscribe(data => {
        var fileURL = URL.createObjectURL(data);
        window.open(fileURL);
        this.dialogRef.close()
      }, error => {
        console.log(error)
      })
  }

  private createReportForm() {
    return this.fb.group({
        responsible: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email])]
      }
    )
  }

}
