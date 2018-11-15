import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SiteServiceService } from '../../providers/site-service.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { SiteDTO } from '../../DTOs/siteDTO';
import { FullSiteDTO } from '../../DTOs/fullSiteDTO';

@Component({
  selector: 'app-edit-site-custom-dialog',
  templateUrl: './edit-site-custom-dialog.component.html',
  styleUrls: ['./edit-site-custom-dialog.component.css']
})
export class EditSiteCustomDialogComponent implements OnInit {
  form: FormGroup;
  siteResult: FullSiteDTO;
  
  constructor(private siteService: SiteServiceService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditSiteCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      siteName: [this.data.elementCopy.name, Validators.compose([Validators.required,Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я-.", ]+')])],
      siteAddress: [this.data.elementCopy.address, Validators.compose([Validators.required,Validators.maxLength(90), Validators.pattern('[a-zA-Z0-9а-яА-Я-.", ]+')])],
      sitePhone: [this.data.elementCopy.phone, Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]+')])]
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
        
      this.siteService.editSite(siteDTO,this.data.elementCopy.id).subscribe(siteResult => {
        this.siteResult = siteResult;
        this.dialogRef.close(this.siteResult);
      })
    }

  }

}
