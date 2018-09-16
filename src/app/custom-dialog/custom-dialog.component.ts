import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { MatDialogRef } from '../../../node_modules/@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {
  form: FormGroup;
  // @Inject(MAT_DIALOG_DATA) public data: any
  
  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<CustomDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      clientName: [this.data.clientName, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientBulstat: [this.data.clientBulstat, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientEgn: [this.data.clientEgn, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientAddress: [this.data.clientAddress, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientTDD: [this.data.clientTDD, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientComment: [this.data.clientComment, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manName: [this.data.manName, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manPhone: [this.data.manPhone, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
    })
  }

  submit(form) {
    this.dialogRef.close('${form.value.clientName}');
  }

}
