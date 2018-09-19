import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeviceModelService } from '../providers/device-model.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DeviceModel } from '../DTOs/deviceModel';
import { FullDeviceModel } from '../DTOs/fullDeviceModel';

@Component({
  selector: 'app-add-device-model-dialog',
  templateUrl: './add-device-model-dialog.component.html',
  styleUrls: ['./add-device-model-dialog.component.css']
})
export class AddDeviceModelDialogComponent implements OnInit {
  form: FormGroup;
  deviceModelResult: FullDeviceModel;

  constructor(private deviceModelService: DeviceModelService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDeviceModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      manufacturer: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      model: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      certificate: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      deviceNumPrefix: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      fiscalNumPrefix: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit(form) {

    if (this.form.valid) {
      let deviceModelDTO = new DeviceModel(
        this.form.controls['manufacturer'].value,
        this.form.controls['model'].value,
        this.form.controls['certificate'].value,
        this.form.controls['deviceNumPrefix'].value,
        this.form.controls['fiscalNumPrefix'].value);

      this.deviceModelService.addNewDeviceModel(deviceModelDTO).subscribe(deviceModelResult => {
        this.deviceModelResult = deviceModelResult;
        this.dialogRef.close(this.deviceModelResult);
      })
    }else{
      this.dialogRef.close(this.form.valid);
    }

  }
}
