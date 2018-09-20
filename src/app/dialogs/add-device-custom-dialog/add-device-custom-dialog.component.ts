import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { DeviceModelService } from '../../providers/device-model.service';
import { FullDeviceModel } from '../../DTOs/fullDeviceModel';
import { DeviceDTO } from '../../DTOs/deviceDTO';
import { DeviceService } from '../../providers/device.service';
import { FullDeviceDTO } from '../../DTOs/fullDeviceDTO';

@Component({
  selector: 'app-add-device-custom-dialog',
  templateUrl: './add-device-custom-dialog.component.html',
  styleUrls: ['./add-device-custom-dialog.component.css']
})
export class AddDeviceCustomDialogComponent implements OnInit {
  form: FormGroup;
  selectedValue: string;
  //deviceModelResult: FullDeviceModel;
  deviceModels: any[];
  deviceResult: FullDeviceDTO;
  siteId: number;

  constructor(private deviceService: DeviceService, private deviceModelService: DeviceModelService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDeviceCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.siteId = this.data.element;
    this.deviceModelService.getAllDeviceModelsJSON().subscribe(deviceModels => {
      this.deviceModels = deviceModels;
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sim: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      deviceNumPostfix: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      fiscalNumPostfix: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napNumber: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napDate: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я- ]+')])]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
  addDevice() {

    console.log('aree dee');
    if (this.form.valid) {
      let deviceDTO = new DeviceDTO(
        this.form.controls['sim'].value,
        this.form.controls['deviceNumPostfix'].value,
        this.form.controls['fiscalNumPostfix'].value,
        this.form.controls['napNumber'].value,
        this.form.controls['napDate'].value);
      console.log('aree dee', deviceDTO);

      this.deviceService.createNewDevice(deviceDTO, this.siteId, parseInt(this.selectedValue)).subscribe(deviceResult => {
        this.deviceResult = deviceResult;
        this.dialogRef.close(this.deviceResult);
      })
    }

  }
}
