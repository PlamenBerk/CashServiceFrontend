import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeviceModelService } from '../../providers/device-model.service';
import { DeviceService } from '../../providers/device.service';
import { Validators } from '@angular/forms';
import { DeviceDTO } from '../../DTOs/deviceDTO';
import { FullDeviceDTO } from '../../DTOs/fullDeviceDTO';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-device-custom-dialog',
  templateUrl: './edit-device-custom-dialog.component.html',
  styleUrls: ['./edit-device-custom-dialog.component.css']
})
export class EditDeviceCustomDialogComponent implements OnInit {
  form: FormGroup;
  deviceResult: FullDeviceDTO;
  
  constructor(@Inject(LOCALE_ID) private locale: string,private deviceService: DeviceService, private deviceModelService: DeviceModelService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditDeviceCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sim: [this.data.elementCopy.sim, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      deviceNumPostfix: [this.data.elementCopy.deviceNumPostfix, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      fiscalNumPostfix: [this.data.elementCopy.fiscalNumPostfix, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napNumber: [this.data.elementCopy.napNumber, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napDate: [this.transformDate(this.data.elementCopy.napDate), Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я- ]+')])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  transformDate(date) {
    return formatDate(date, 'dd-MM-yyyy', this.locale);
  }

  editDevice() {
    if (this.form.valid) {
      let deviceDTO = new DeviceDTO(
        this.form.controls['sim'].value,
        this.form.controls['deviceNumPostfix'].value,
        this.form.controls['fiscalNumPostfix'].value,
        this.form.controls['napNumber'].value,
        this.form.controls['napDate'].value);

      this.deviceService.editDevice(deviceDTO,this.data.elementCopy.id).subscribe(deviceResult => {
        this.deviceResult = deviceResult;
        this.dialogRef.close(this.deviceResult);
      })
    }
  }

}
