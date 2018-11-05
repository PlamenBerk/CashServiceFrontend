import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DocumentGeneratorService } from 'src/app/providers/document-generator.service';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';
import { ProtocolDTO } from 'src/app/DTOs/protocolDTO';

@Component({
  selector: 'app-generate-protocol-custom-dialog',
  templateUrl: './generate-protocol-custom-dialog.component.html',
  styleUrls: ['./generate-protocol-custom-dialog.component.css']
})
export class GenerateProtocolCustomDialogComponent implements OnInit {

  id: string;
  reason: string;
  price: string;
  aprice: string = "0";
  bprice: string = "0";
  vprice: string = "0";
  gprice: string = "0";

  constructor(public snackBar: MatSnackBar,private documentGenerator: DocumentGeneratorService,private dialogRef: MatDialogRef<GenerateProtocolCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.id = this.data.id;
  }

  closeDialog() {
    this.dialogRef.close('closed');
  }

  generate(){
    if(this.reason == null){
      this.snackBar.open('Внимание!', 'Изберете документ!', {
        duration: 2000,
      });
    }else if(this.price == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else if(this.aprice == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else if(this.bprice == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else if(this.vprice == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else if(this.gprice == null){
      this.snackBar.open('Внимание!', 'Изберете номер на сертификата!', {
        duration: 2000,
      });
    }else {
      let protocolDTO = new ProtocolDTO(this.id,this.reason,this.price,this.aprice,this.bprice,this.vprice,this.gprice);

      this.documentGenerator.generateProtocol(protocolDTO).subscribe(docResult => {
        fileSaver.saveAs(docResult);
        this.dialogRef.close('Документът е запазен!');
      })
    } 
  }

}
