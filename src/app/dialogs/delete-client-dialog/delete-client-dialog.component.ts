import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CashRegisterService } from 'src/app/providers/cash-register.service';
import { ClientDTO } from 'src/app/DTOs/clientDTO';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {

  clientResult:ClientDTO;
  clientName: string;
  receivedData: any;
   form: FormGroup;

  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<DeleteClientDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private clientService: CashRegisterService) { }

  ngOnInit() {
    this.receivedData = this.data.elementCopy;
    this.clientName = this.data.elementCopy.name;
     this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required,Validators.maxLength(30)])]
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  delete(){
     var result = 
                     {
                         "user": this.form.controls['username'].value,
                         "pass": this.form.controls['password'].value
                     };
    this.clientService.deleteClient(this.receivedData.id,result).subscribe(clientResult => {
        this.clientResult = clientResult;
        this.dialogRef.close(this.clientResult);
      })
  }

}
