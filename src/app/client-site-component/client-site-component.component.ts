import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { CashRegisterService } from '../providers/cash-register.service';
import { ViewChildren } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { SiteServiceService } from '../providers/site-service.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';
import { CustomDialogComponent } from '../dialogs/edit-client-custom-dialog/custom-dialog.component';
import { Injectable } from '@angular/core';
import { AddClientCustomDialogComponent } from '../dialogs/add-client-custom-dialog/add-client-custom-dialog.component';
import { AddSiteCustomDialogComponent } from '../dialogs/add-site-custom-dialog/add-site-custom-dialog.component';
import { EditSiteCustomDialogComponent } from '../dialogs/edit-site-custom-dialog/edit-site-custom-dialog.component';
import { MatTabChangeEvent } from '@angular/material';
import { DeviceModelService } from '../providers/device-model.service';
import { AddDeviceModelDialogComponent } from '../dialogs/add-device-model-dialog/add-device-model-dialog.component';
import { EditDeviceModelDialogComponent } from '../dialogs/edit-device-model-dialog/edit-device-model-dialog.component';
import { AddDeviceCustomDialogComponent } from '../dialogs/add-device-custom-dialog/add-device-custom-dialog.component';
import { DeviceService } from '../providers/device.service';
import { EditDeviceCustomDialogComponent } from '../dialogs/edit-device-custom-dialog/edit-device-custom-dialog.component';
import { GenerateDocumentsCustomDialogComponent } from '../dialogs/generate-documents-custom-dialog/generate-documents-custom-dialog.component';
import { DocumentGeneratorService } from '../providers/document-generator.service';

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
  deviceModels: Array<any>;
  deviceDesults: Array<any>;
  documentResults: Array<any>;

  dateFrom: Date;
  dateTo: Date;

  tempRow: number;
  dataSourceClients;
  dataSourceSites;
  dataSourceDevices;
  dataSourceDevicesModels;
  dataSourceDocuments;
  selectedRowIndex: number = -1;
  selectedRowIndex2: number = -1;

  columnsToDisplay = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone', 'Actions'];
  columnsToDisplay2 = ['name', 'address', 'phone', 'Actions'];
  columnsToDisplay3 = ['sim', 'deviceNumPostfix', 'fiscalNumPostfix', 'napNumber', 'napDate', 'Actions'];
  columnsToDisplay4 = ['manufacturer', 'model', 'certificate', 'deviceNumPrefix', 'fiscalNumPrefix', 'Actions'];
  columnsToDisplay5 = ['documentName', 'startDate', 'endDate', 'Actions'];

  columnHeaders = ['Име', 'Бул', 'ЕГН', 'Адрес', 'ТДД', 'Коментар', 'Мениджър', 'Телефон', 'Действия'];
  columnHeadersSites = ['Име', 'Адрес', 'телефон', 'Действия'];
  columnHeadersDevices = ['СИМ', 'Сериен номер', 'Фискална памет', 'НАП номер', 'НАП дата (yyyy/MM/dd)', 'Действия'];
  columnHeadersDevicesModels = ['Производител', 'Модел', 'Свидетелство', 'Сериен номер префикс', 'Фискален номер префикс', 'Действия'];
  columnHeadersDocuments = ['Име на документа', 'Начална дата', 'Крайна дата', 'Действия'];

  constructor(private docGeneratorService: DocumentGeneratorService,public snackBar: MatSnackBar, private deviceService: DeviceService, private clientService: CashRegisterService, private deviceModelService: DeviceModelService, private siteService: SiteServiceService, private matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialogEditClient: MatDialog, private dialogNewClient: MatDialog, private dialogNewSite: MatDialog, private dialogEditSite: MatDialog, private dialogAddNewDeviceModel: MatDialog, private dialogEditDeviceModel: MatDialog, private dialogEditDevice: MatDialog, private dialogAddDevice: MatDialog, private dialogGenerateDocument: MatDialog) {
    this.matIconRegistry.addSvgIcon(
      'icon_add',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/client_add_icon.svg'),
    ).addSvgIcon(
      'icon_edit',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/Edit_Icon.svg'),
    ).addSvgIcon(
      'icon_doc',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/document_icon.svg'),
    ).addSvgIcon(
      'search_icon',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/search_icon.svg'),
    ).addSvgIcon(
      'preview_icon',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/preview_icon.svg'),
    );

  }

  ngOnInit() {
    this.clientResults = [];
    this.clientService.getAllClients().subscribe(clientResults => {
      this.clientResults = clientResults;
      this.dataSourceClients = new MatTableDataSource(this.clientResults);
    })

  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  highlight2(row) {
    this.selectedRowIndex2 = row.id;
  }

  applyFilter(filterValue: string) {
    this.dataSourceClients.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    this.dataSourceSites.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(filterValue: string) {
    this.dataSourceDevices.filter = filterValue.trim().toLowerCase();
  }

  applyFilter4(filterValue: string) {
    this.dataSourceDevicesModels.filter = filterValue.trim().toLowerCase();
  }

  showSites(row: any) {
    console.log('rowwww', row);
    this.siteResults = [];
    this.siteService.getSitesForClient(row.id).subscribe(siteResults => {
      this.siteResults = siteResults;
      this.dataSourceSites = new MatTableDataSource(this.siteResults);
    })
    this.dataSourceDevices = [];
  }

  // --------- Client functionality ----------------
  addClient() {

    const dialogRef = this.dialogNewClient.open(AddClientCustomDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialog');
      } else {
        const tempData = this.dataSourceClients.data;
        tempData.push(result);
        this.dataSourceClients.data = tempData;
      }
    });
  }

  editClient(element: any) {
    var copy = Object.assign({}, element);
    this.tempRow = element.id;

    const dialogRef = this.dialogEditClient.open(CustomDialogComponent, {

      data: {
        elementCopy: copy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      Object.assign(element, result);
    });
  }
  //--------------------------------------------------------------------
  selectedTabChange() {
    console.log('tabvheee');
  }
  // --------------- Site functionality
  addSiteForClient(clientId: number) {
    const dialogRef = this.dialogNewSite.open(AddSiteCustomDialogComponent, {
      data: {
        clientId: clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('close add site dialog');
      } else {
        const tempData = this.dataSourceSites.data;
        tempData.push(result);
        this.dataSourceSites.data = tempData;
      }
    });
  }

  editSite(element: any) {
    var copy = Object.assign({}, element);
    const dialogRef = this.dialogEditSite.open(EditSiteCustomDialogComponent, {

      data: {
        elementCopy: copy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('close edit site dialog');
      } else {
        Object.assign(element, result);
      }
    });
  }
  // ---------------------------------------------------------------------

  // ------- DeviceModel functonality
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 1) {
      this.loadDeviceModelData();
    }
  }

  loadDeviceModelData() {
    this.deviceModels = [];
    this.deviceModelService.getAllDeviceModels().subscribe(deviceModels => {
      this.deviceModels = deviceModels;
      this.dataSourceDevicesModels = new MatTableDataSource(this.deviceModels);
    })
  }

  addNewDeviceModel() {
    const dialogRef = this.dialogAddNewDeviceModel.open(AddDeviceModelDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialog');
      } else {
        const tempData = this.dataSourceDevicesModels.data;
        tempData.push(result);
        this.dataSourceDevicesModels.data = tempData;
      }
    });
  }

  editDeviceModel(element: any) {
    var copy = Object.assign({}, element);

    const dialogRef = this.dialogEditDeviceModel.open(EditDeviceModelDialogComponent, {
      data: {
        elementCopy: copy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('close edit site dialog');
      } else {
        Object.assign(element, result);
      }
    });
  }

  // ------- Device functionality ----------
  showDevices(element: any) {
    this.deviceDesults = [];
    this.deviceService.getDevicesForSite(element.id).subscribe(deviceDesults => {
      this.deviceDesults = deviceDesults;
      this.dataSourceDevices = new MatTableDataSource(this.deviceDesults);
    })
  }

  editDevice(element: any) {
    var copy = Object.assign({}, element);

    const dialogRef = this.dialogEditDevice.open(EditDeviceCustomDialogComponent, {
      data: {
        elementCopy: copy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('close edit site dialog');
      } else {
        Object.assign(element, result);
      }
    });
  }

  addDeviceForSite(siteId: any) {
    const dialogRef = this.dialogAddDevice.open(AddDeviceCustomDialogComponent, {
      data: {
        element: siteId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('close add site dialog');
      } else {
        const tempData = this.dataSourceDevices.data;
        tempData.push(result);
        this.dataSourceDevices.data = tempData;
      }
    });
  }

  generateDocument(elementId: any) {
    const dialogRef = this.dialogGenerateDocument.open(GenerateDocumentsCustomDialogComponent, {
      data: {
        id: elementId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'closed') {
        console.log('closedDialog');
      } else {
        this.snackBar.open(result, '', {
          duration: 3000,
        });
      }
    });
  }

  // ----- Document functionality
  searchDocuments(){
    var dateF = new Date(this.dateFrom);
    var dateT = new Date(this.dateTo);
    this.documentResults = [];
    this.docGeneratorService.searchExpiredDocuments(dateF,dateT).subscribe(documentResults => {
      this.documentResults = documentResults;
      this.dataSourceDocuments = new MatTableDataSource(this.documentResults);
    })
  }

  previewDocument(doc: any){
    var docId = doc.id;
    this.docGeneratorService.previewDocument(docId).subscribe(documentResults => {
      console.log(documentResults);
    })
  }

}