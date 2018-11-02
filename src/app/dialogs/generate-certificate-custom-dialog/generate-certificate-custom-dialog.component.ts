import { Component, OnInit, Inject } from '@angular/core';
import { DocumentGeneratorService } from 'src/app/providers/document-generator.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CertificateDTO } from 'src/app/DTOs/certificateDTO';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-generate-certificate-custom-dialog',
  templateUrl: './generate-certificate-custom-dialog.component.html',
  styleUrls: ['./generate-certificate-custom-dialog.component.css']
})
export class GenerateCertificateCustomDialogComponent implements OnInit {

  id: string;
  selectedValue = 'certificate';
  certNumber: string;

  constructor(public snackBar: MatSnackBar,private documentGenerator: DocumentGeneratorService,private dialogRef: MatDialogRef<GenerateCertificateCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
     this.id = this.data.id;
  }

  closeDialog() {
    this.dialogRef.close('closed');
  }

  generate(){
    if(this.selectedValue == null){
      this.snackBar.open('Внимание!', 'Изберете документ!', {
        duration: 2000,
      });
    }else if(this.certNumber == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else {
      let certDTO = new CertificateDTO(this.id,this.selectedValue,this.certNumber);
  
      this.documentGenerator.generateCertificate(certDTO).subscribe(docResult => {
        fileSaver.saveAs(docResult);
        this.dialogRef.close('Документът е запазен!');
      })
    } 
  }

}
