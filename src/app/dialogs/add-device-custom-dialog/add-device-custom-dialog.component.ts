import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { DeviceModelService } from '../../providers/device-model.service';
import { FullDeviceModel } from '../../DTOs/fullDeviceModel';
import { DeviceDTO } from '../../DTOs/deviceDTO';
import { DeviceService } from '../../providers/device.service';
import { FullDeviceDTO } from '../../DTOs/fullDeviceDTO';
import { formatDate } from '@angular/common';
import { MyDateAdapter } from 'src/app/DTOs/MyDateAdapter';

const MY_DATE_FORMATS = {
   parse: {
       dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
   },
   display: {
       // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
       dateInput: 'input',
       monthYearLabel: {year: 'numeric', month: 'short'},
       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
       monthYearA11yLabel: {year: 'numeric', month: 'long'},
   }
};

@Component({
  selector: 'app-add-device-custom-dialog',
  templateUrl: './add-device-custom-dialog.component.html',
  styleUrls: ['./add-device-custom-dialog.component.css'],
   providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
],
})
export class AddDeviceCustomDialogComponent implements OnInit {
  form: FormGroup;
  selectedValue: string;
  deviceModels: any[];
  deviceResult: FullDeviceDTO;
  siteId: number;
  napDateP: Date;

  constructor(@Inject(LOCALE_ID) private locale: string,private deviceService: DeviceService, private deviceModelService: DeviceModelService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDeviceCustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.siteId = this.data.element;
    this.deviceModelService.getAllDeviceModelsJSON().subscribe(deviceModels => {
      this.deviceModels = deviceModels;
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sim: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      deviceNumPostfix: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(6),Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      fiscalNumPostfix: ['', Validators.compose([Validators.required, Validators.maxLength(6),Validators.minLength(6), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napNumber: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9а-яА-Я ]+')])],
      napDate: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      simPhone: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[0-9+ ]+')])],
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  transformDate(date) {
    return formatDate(date, 'dd-MM-yyyy', this.locale);
  }
  
  addDevice() {
    if (this.form.valid) {
      var napDateString = this.transformDate(this.napDateP);
      let deviceDTO = new DeviceDTO(
        this.form.controls['sim'].value,
        this.form.controls['deviceNumPostfix'].value,
        this.form.controls['fiscalNumPostfix'].value,
        this.form.controls['napNumber'].value,
        napDateString,
        this.form.controls['simPhone'].value);
        
      this.deviceService.createNewDevice(deviceDTO, this.siteId, parseInt(this.selectedValue)).subscribe(deviceResult => {
        this.deviceResult = deviceResult;
        this.dialogRef.close(this.deviceResult);
      })
    }

  }
}
