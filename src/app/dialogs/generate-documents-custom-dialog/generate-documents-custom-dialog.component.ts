import { Component, OnInit } from '@angular/core';
import { DocumentGeneratorService } from '../../providers/document-generator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { DocumentDTO } from '../../DTOs/documentDTO';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-generate-documents-custom-dialog',
  templateUrl: './generate-documents-custom-dialog.component.html',
  styleUrls: ['./generate-documents-custom-dialog.component.css']
})
export class GenerateDocumentsCustomDialogComponent implements OnInit {

  selectedValue: string;
  id: string;
  docResult: string;
  documentTypes: any[] = [
      {value: 'contract', viewValue: 'Договор'},
      {value: 'certificate', viewValue: 'Сертификат'},
      {value: 'protocol', viewValue: 'Протокол'}
    ];

  constructor(public snackBar: MatSnackBar,private documentGenerator: DocumentGeneratorService,private dialogRef: MatDialogRef<GenerateDocumentsCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.id = this.data.id;
  }

  generate(){
    if(this.selectedValue == null){
      this.snackBar.open('Внимание!', 'Изберете документ!', {
        duration: 2000,
      });
    }else{
      let docDTO = new DocumentDTO(this.id,this.selectedValue);
  
      this.documentGenerator.generateDocument(docDTO).subscribe(docResult => {
        console.log('docresult',docResult);
        fileSaver.saveAs(docResult);
        this.dialogRef.close('Документът е запазен!');
      })
    } 
  }

  closeDialog() {
    this.dialogRef.close('closed');
  }

}
