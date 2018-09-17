import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../node_modules/@angular/material';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-site-custom-dialog',
  templateUrl: './add-site-custom-dialog.component.html',
  styleUrls: ['./add-site-custom-dialog.component.css']
})
export class AddSiteCustomDialogComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddSiteCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      siteName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      siteAddress: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      sitePhone: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit(form) {

    if (form.valid) {
      // invoke site post request (create it first :D )
      

      // this.clientService.createNewClient(clientManagerDto).subscribe(clientResult => {
      //   this.clientResult = clientResult;
      //   this.dialogRef.close(this.clientResult);
      // })
    }

  }


}
