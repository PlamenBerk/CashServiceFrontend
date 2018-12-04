import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DeviceService } from 'src/app/providers/device.service';
import { FullDeviceDTO } from 'src/app/DTOs/fullDeviceDTO';

@Component({
  selector: 'app-delete-device-dialog',
  templateUrl: './delete-device-dialog.component.html',
  styleUrls: ['./delete-device-dialog.component.css']
})
export class DeleteDeviceDialogComponent implements OnInit {

   receivedData: any;
   serialNumber: string;
   form: FormGroup;
   deviceResult: FullDeviceDTO;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DeleteDeviceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private deviceService: DeviceService) { }

  ngOnInit() {
    this.receivedData = this.data.elementCopy;
    this.serialNumber = this.data.elementCopy.deviceNumPostfix;
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
    this.deviceService.deleteClient(this.receivedData.id, result).subscribe(deviceResult => {
      this.deviceResult = deviceResult;
      this.dialogRef.close(this.deviceResult);
    })
  }

}
