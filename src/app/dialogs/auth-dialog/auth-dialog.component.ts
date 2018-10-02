import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AuthDialogComponent>,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required,Validators.maxLength(30)])]
    })
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  submit(form) {

    if (this.form.valid) {
      var result = 
                     {
                         "user": this.form.controls['username'].value,
                         "pass": this.form.controls['password'].value
                     };
                  
      this.dialogRef.close(result);  
    }
  }
}
