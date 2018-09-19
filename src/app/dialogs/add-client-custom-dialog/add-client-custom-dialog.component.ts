import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClientManagerDTO, Client, Manager } from '../../DTOs/clientManagerDTO';
import { CashRegisterService } from '../../providers/cash-register.service';
import { ClientDTO } from '../../DTOs/clientDTO';

@Component({
  selector: 'app-add-client-custom-dialog',
  templateUrl: './add-client-custom-dialog.component.html',
  styleUrls: ['./add-client-custom-dialog.component.css']
})
export class AddClientCustomDialogComponent implements OnInit {
  form: FormGroup;
  clientResult: ClientDTO;

  constructor(private clientService: CashRegisterService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddClientCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientBulstat: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientEgn: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientAddress: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientTDD: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientComment: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manName: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manPhone: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
    })
    this.form.setErrors({ 'invalid': true });
  }

  closeDialog() {
    this.dialogRef.close(1);
  }

  submit(form) {

    if (this.form.valid) {
      console.log('vleznah vuv valid');
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
      
      this.clientService.createNewClient(clientManagerDto).subscribe(clientResult => {
        this.clientResult = clientResult;
        this.dialogRef.close(this.clientResult);
      })
    }else{
      this.dialogRef.close(this.form.valid);
    }

  }

}
