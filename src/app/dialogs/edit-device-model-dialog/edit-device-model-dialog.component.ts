import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeviceModelService } from '../../providers/device-model.service';
import { Validators } from '@angular/forms';
import { DeviceModel } from '../../DTOs/deviceModel';
import { FullDeviceModel } from '../../DTOs/fullDeviceModel';

@Component({
  selector: 'app-edit-device-model-dialog',
  templateUrl: './edit-device-model-dialog.component.html',
  styleUrls: ['./edit-device-model-dialog.component.css']
})
export class EditDeviceModelDialogComponent implements OnInit {
  form: FormGroup;
  deviceModelResult: FullDeviceModel;

  constructor(private deviceModelService: DeviceModelService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditDeviceModelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      manufacturer: [this.data.elementCopy.manufacturer, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      model: [this.data.elementCopy.model, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      certificate: [this.data.elementCopy.certificate, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      deviceNumPrefix: [this.data.elementCopy.deviceNumPrefix, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      fiscalNumPrefix: [this.data.elementCopy.fiscalNumPrefix, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      eik: [this.data.elementCopy.eik, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])]
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
        this.form.controls['fiscalNumPrefix'].value,
        this.form.controls['eik'].value);

      this.deviceModelService.updateDeviceModelInfo(deviceModelDTO, this.data.elementCopy.id).subscribe(deviceModelResult => {
        this.deviceModelResult = deviceModelResult;
        this.dialogRef.close(this.deviceModelResult);
      })

    } else {
      this.dialogRef.close(this.form.valid);
    }
  }

}
