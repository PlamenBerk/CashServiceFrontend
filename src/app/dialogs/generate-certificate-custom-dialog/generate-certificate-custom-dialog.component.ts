import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { DocumentGeneratorService } from 'src/app/providers/document-generator.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { CertificateDTO } from 'src/app/DTOs/certificateDTO';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';
import { MyDateAdapter } from '../../DTOs/MyDateAdapter';
import { formatDate } from '../../../../node_modules/@angular/common';

const MY_DATE_FORMATS = {
  parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
      // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@Component({
  selector: 'app-generate-certificate-custom-dialog',
  templateUrl: './generate-certificate-custom-dialog.component.html',
  styleUrls: ['./generate-certificate-custom-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
],
})
export class GenerateCertificateCustomDialogComponent implements OnInit {

  id: string;
  selectedValue = 'certificate';
  certNumber: string;
  fromDate: Date;

  constructor(@Inject(LOCALE_ID) private locale: string,public snackBar: MatSnackBar,private documentGenerator: DocumentGeneratorService,private dialogRef: MatDialogRef<GenerateCertificateCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
     this.id = this.data.id;
  }

  transformDate(date) {
    return formatDate(date, 'dd-MM-yyyy', this.locale);
  }

  closeDialog() {
    this.dialogRef.close('closed');
  }

  generate(){
    if(this.fromDate == null){
      this.snackBar.open('Внимание!', 'Изберете документ!', {
        duration: 2000,
      });
    }else if(this.certNumber == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else {
      var fromDateStr = this.transformDate(this.fromDate);
      let certDTO = new CertificateDTO(this.id,fromDateStr,this.certNumber);
  
      this.documentGenerator.generateCertificate(certDTO).subscribe(docResult => {
        fileSaver.saveAs(docResult);
        this.dialogRef.close('Документът е запазен!');
      })
    } 
  }

}
