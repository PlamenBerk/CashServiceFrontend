import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client-custom-dialog',
  templateUrl: './add-client-custom-dialog.component.html',
  styleUrls: ['./add-client-custom-dialog.component.css']
})
export class AddClientCustomDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddClientCustomDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientBulstat: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientEgn: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientAddress: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientTDD: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      clientComment: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      manPhone: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submit(form) {
    
  }

}
