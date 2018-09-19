import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../../node_modules/@angular/material';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { SiteDTO } from '../../DTOs/siteDTO';
import { SiteServiceService } from '../../providers/site-service.service';
import { FullSiteDTO } from '../../DTOs/fullSiteDTO';

@Component({
  selector: 'app-add-site-custom-dialog',
  templateUrl: './add-site-custom-dialog.component.html',
  styleUrls: ['./add-site-custom-dialog.component.css']
})
export class AddSiteCustomDialogComponent implements OnInit {
  form: FormGroup;
  siteResult: FullSiteDTO;
  
  constructor(private siteService: SiteServiceService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddSiteCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      siteName: ['', Validators.compose([Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      siteAddress: ['', Validators.compose([Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      sitePhone: ['', Validators.compose([Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit(form) {

    if (this.form.valid) {
      let siteDTO = new SiteDTO(
        this.form.controls['siteName'].value,
        this.form.controls['siteAddress'].value,
        this.form.controls['sitePhone'].value);

      this.siteService.createNewSite(siteDTO,this.data.clientId).subscribe(siteResult => {
        this.siteResult = siteResult;
        this.dialogRef.close(this.siteResult);
      })
    }

  }


}
