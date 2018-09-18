import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { MatDialogRef } from '../../../node_modules/@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material'
import { CashRegisterService } from '../providers/cash-register.service';
import { ClientDTO } from '../DTOs/clientDTO';
import { ClientManagerDTO, Client, Manager } from '../DTOs/clientManagerDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {
  form: FormGroup;
  clientDTO: ClientDTO;
  clientResults: Array<any>;
  clientResult:ClientDTO;
  
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<CustomDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private clientService: CashRegisterService) {

   }

  ngOnInit() {
    console.table(this.data.test);
    this.form = this.formBuilder.group({
      clientName: [this.data.test.name, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientBulstat: [this.data.test.bulstat, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientEgn: [this.data.test.egn, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientAddress: [this.data.test.address, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientTDD: [this.data.test.tdd, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientComment: [this.data.test.comment, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manName: [this.data.test.managerName, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manPhone: [this.data.test.managerPhone, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(form) {
       
    if(this.form.valid){
      let clientManagerDto = new ClientManagerDTO(
        new Client(
          this.form.controls['clientAddress'].value,
          this.form.controls['clientBulstat'].value,
          this.form.controls['clientComment'].value,
          this.form.controls['clientEgn'].value,
          this.form.controls['clientName'].value,
          this.form.controls['clientTDD'].value),
        new Manager(
          this.form.controls['manName'].value,
          this.form.controls['manPhone'].value)
      );
      // todo vijjjj si tukaaa service shto ne ti dava otg....s
      console.log('huj',clientManagerDto);

      this.clientService.updateClientInfo(clientManagerDto,this.data.test.id).subscribe(clientResult => {
        this.clientResult = clientResult;
        this.dialogRef.close(this.clientResult);
      })
      
    }
  }

}
