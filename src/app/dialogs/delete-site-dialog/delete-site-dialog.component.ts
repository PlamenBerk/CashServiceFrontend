import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SiteServiceService } from 'src/app/providers/site-service.service';
import { SiteDTO } from 'src/app/DTOs/SiteDTO';
import { FullSiteDTO } from 'src/app/DTOs/fullSiteDTO';

@Component({
  selector: 'app-delete-site-dialog',
  templateUrl: './delete-site-dialog.component.html',
  styleUrls: ['./delete-site-dialog.component.css']
})
export class DeleteSiteDialogComponent implements OnInit {

  form: FormGroup;
  siteName: string;
  receivedData: any;
  siteResult: FullSiteDTO;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DeleteSiteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private siteServie: SiteServiceService) { }

  ngOnInit() {
    this.receivedData = this.data.elementCopy;
    this.siteName = this.data.elementCopy.name;
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    let result =
    {
      "user": this.form.controls['username'].value,
      "pass": this.form.controls['password'].value
    };
    this.siteServie.deleteSite(this.receivedData.id, result).subscribe(siteResult => {
      this.siteResult = siteResult;
      this.dialogRef.close(this.siteResult);
    })
  }

}
