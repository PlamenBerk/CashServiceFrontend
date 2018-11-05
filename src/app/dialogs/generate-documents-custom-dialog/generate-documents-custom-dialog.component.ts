import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { DocumentGeneratorService } from '../../providers/document-generator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Inject } from '@angular/core';
import { DocumentDTO } from '../../DTOs/documentDTO';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';
import { formatDate } from '@angular/common';
import { MyDateAdapter } from 'src/app/DTOs/MyDateAdapter';

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
  selector: 'app-generate-documents-custom-dialog',
  templateUrl: './generate-documents-custom-dialog.component.html',
  styleUrls: ['./generate-documents-custom-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
],
})
export class GenerateDocumentsCustomDialogComponent implements OnInit {

  selectedValue = 'contract';
  selectedValueValidy: number;
  contractNumber: string;
  fromDate: Date;
  price: string;

  id: string;
  docResult: string;

    documentTimeValid: any[] = [
      {value: '6', viewValue: '6'},
      {value: '12', viewValue: '12'}
    ];

  constructor(@Inject(LOCALE_ID) private locale: string,public snackBar: MatSnackBar,private documentGenerator: DocumentGeneratorService,private dialogRef: MatDialogRef<GenerateDocumentsCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit() {
    this.id = this.data.id;
  }

   transformDate(date) {
    return formatDate(date, 'dd-MM-yyyy', this.locale);
  }

  generate(){
    if(this.selectedValue == null){
      this.snackBar.open('Внимание!', 'Изберете документ!', {
        duration: 2000,
      });
    }else if(this.selectedValueValidy == null){
      this.snackBar.open('Внимание!', 'Изберете валидност!', {
        duration: 2000,
      });
    }else if(this.contractNumber == null){
      this.snackBar.open('Внимание!', 'Изберете номер на документа!', {
        duration: 2000,
      });
    }else if(this.fromDate == null){
      this.snackBar.open('Внимание!', 'Изберете начална дата!', {
        duration: 2000,
      });
    }else if(this.price == null){
      this.snackBar.open('Внимание!', 'Изберете цена!', {
        duration: 2000,
      });
    } else {
      let fromDateToString = this.transformDate(this.fromDate);
      let docDTO = new DocumentDTO(this.id,this.selectedValue,this.selectedValueValidy,this.contractNumber,fromDateToString,this.price);

      this.documentGenerator.generateDocument(docDTO).subscribe(docResult => {
        fileSaver.saveAs(docResult);
        this.dialogRef.close('Документът е запазен!');
      })
    } 
  }

  closeDialog() {
    this.dialogRef.close('closed');
  }

}
