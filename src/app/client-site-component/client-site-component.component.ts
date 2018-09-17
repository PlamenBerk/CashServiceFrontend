import { Component, OnInit  } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CashRegisterService } from '../providers/cash-register.service';
import { ViewChildren } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { SiteServiceService } from '../providers/site-service.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'client-site-component',
  styleUrls: ['client-site-component.component.css'],
  templateUrl: 'client-site-component.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
@Injectable()
export class ClientSiteComponentComponent {
  private selectedTab = 0;
  expandedRow: number;
  clientResults: Array<any>;
  siteResults: Array<any>;
  tempRow: number;
  dataSource;
  dataSource2;
  columnsToDisplay = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone', 'Actions'];
  columnsToDisplay2 = ['name', 'address', 'phone'];

  columnHeaders = ['Име', 'Бул', 'ЕГН', 'Адрес', 'ТДД', 'Коментар', 'Мениджър', 'Телефон', 'Действия'];
  columnHeadersSites = ['Име', 'Адрес', 'телефон'];

  constructor(private clientService: CashRegisterService, private siteService: SiteServiceService, private matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.matIconRegistry.addSvgIcon(
      'icon_edit',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/Edit_Icon.svg')
    );
  }

  ngOnInit() {
    this.clientResults = [];
    this.clientService.getAllClients().subscribe(clientResults => {
      this.clientResults = clientResults;
      this.dataSource = new MatTableDataSource(this.clientResults);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  showSites(row: any) {
    console.log(row);
    this.siteResults = [];
    this.siteService.getSitesForClient(row.id).subscribe(siteResults => {
      this.siteResults = siteResults;
      this.dataSource2 = new MatTableDataSource(this.siteResults);
    })
  }

  editClient(element: any) {
    this.tempRow = element.id;

    const dialogRef = this.dialog.open(CustomDialogComponent, {
      
      data: {
        id:element.id,
        clientName: element.name,
        clientBulstat: element.bulstat,
        clientEgn: element.egn,
        clientAddress: element.address,
        clientTDD: element.tdd,
        clientComment: element.comment,
        manName: element.managerName,
        manPhone: element.managerPhone
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data[this.tempRow-1].address = result.address;
      this.dataSource.data[this.tempRow-1].name = result.name;
      this.dataSource.data[this.tempRow-1].bulstat = result.bulstat;
      this.dataSource.data[this.tempRow-1].comment = result.comment;
      this.dataSource.data[this.tempRow-1].egn = result.egn;
      this.dataSource.data[this.tempRow-1].tdd = result.tdd;
      this.dataSource.data[this.tempRow-1].managerName = result.managerName;
      this.dataSource.data[this.tempRow-1].managerPhone = result.managerPhone;
    });
  }



}