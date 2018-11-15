import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CashRegisterService } from 'src/app/providers/cash-register.service';
import { ClientDTO } from 'src/app/DTOs/clientDTO';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.css']
})
export class DeleteClientDialogComponent implements OnInit {

  clientResult:ClientDTO;
  clientName: string;
  receivedData: any;

  constructor(private dialogRef: MatDialogRef<DeleteClientDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private clientService: CashRegisterService) { }

  ngOnInit() {
    this.receivedData = this.data.elementCopy;
    this.clientName = this.data.elementCopy.name;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  delete(){
    this.clientService.deleteClient(this.receivedData.id).subscribe(clientResult => {
        this.clientResult = clientResult;
        this.dialogRef.close(this.clientResult);
      })
  }

}
