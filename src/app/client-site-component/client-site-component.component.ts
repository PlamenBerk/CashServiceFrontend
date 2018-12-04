import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatDialog, MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
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
import { AuthDialogComponent } from '../dialogs/auth-dialog/auth-dialog.component';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';
import { GenerateCertificateCustomDialogComponent } from '../dialogs/generate-certificate-custom-dialog/generate-certificate-custom-dialog.component';
import { GenerateProtocolCustomDialogComponent } from '../dialogs/generate-protocol-custom-dialog/generate-protocol-custom-dialog.component';
import { MyDateAdapter } from '../DTOs/MyDateAdapter';
import { formatDate } from '@angular/common';
import { DeleteClientDialogComponent } from '../dialogs/delete-client-dialog/delete-client-dialog.component';
import { DeleteSiteDialogComponent } from '../dialogs/delete-site-dialog/delete-site-dialog.component';
import { DeleteDeviceDialogComponent } from '../dialogs/delete-device-dialog/delete-device-dialog.component';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

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
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
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
  selectedRowIndex = -1;
  selectedRowIndex2 = -1;

  columnsToDisplay = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone', 'Actions'];
  columnsToDisplay2 = ['name', 'address', 'phone', 'Actions'];
  columnsToDisplay3 = ['modelOfDevice', 'sim', 'deviceNumPostfix', 'fiscalNumPostfix', 'napNumber', 'napDate', 'Actions'];
  columnsToDisplay4 = ['manufacturer', 'model', 'certificate', 'deviceNumPrefix', 'fiscalNumPrefix', 'eik', 'Actions'];
  columnsToDisplay5 = ['documentName', 'startDate', 'endDate', 'Actions'];

  columnHeaders = ['Име', 'Бул', 'ЕГН', 'Адрес', 'ТДД', 'Коментар', 'Мениджър', 'Телефон', 'Действия'];
  columnHeadersSites = ['Име', 'Адрес', 'телефон', 'Действия'];
  columnHeadersDevices = ['Модел', 'СИМ', 'Сериен номер', 'Фискална памет', 'НАП номер', 'НАП дата', 'Действия'];
  columnHeadersDevicesModels = ['Производител', 'Модел', 'Свидетелство', 'Сериен номер префикс', 'Фискален номер префикс', 'Булстат', 'Действия'];
  columnHeadersDocuments = ['Име на документа', 'Начална дата', 'Крайна дата', 'Действия'];

  constructor(@Inject(LOCALE_ID) private locale: string, private docGeneratorService: DocumentGeneratorService, public snackBar: MatSnackBar, private deviceService: DeviceService, private clientService: CashRegisterService, private deviceModelService: DeviceModelService, private siteService: SiteServiceService, private matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialogEditClient: MatDialog, private dialogNewClient: MatDialog, private dialogNewSite: MatDialog, private dialogEditSite: MatDialog, private dialogAddNewDeviceModel: MatDialog, private dialogEditDeviceModel: MatDialog, private dialogEditDevice: MatDialog, private dialogAddDevice: MatDialog, private dialogGenerateDocument: MatDialog, private dialogGenerateCert: MatDialog, private dialogAuth: MatDialog, private dialogDeleteClient: MatDialog, private dialogDeleteSite: MatDialog, private dialogDeleteDevice: MatDialog) {
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
    ).addSvgIcon(
      'icon_delete',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/delete_icon.svg'),
    );

  }

  ngOnInit() {
    const dialogRef = this.dialogAuth.open(AuthDialogComponent, {
      panelClass: 'dialog-background'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialogAuth');
      } else {

        this.clientResults = [];
        this.clientService.getAllClients(result).subscribe(clientResults => {
          this.clientResults = clientResults;
          this.dataSourceClients = new MatTableDataSource(this.clientResults);
        },
          (error) => {
            this.snackBar.open('Достъпът е отказан. Презаредете страницата и опитайте отново.', '', {
              duration: 5000,
            });
          })

      }
    });
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
      panelClass: 'dialog-background'
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
    let copy = Object.assign({}, element);
    this.tempRow = element.id;

    const dialogRef = this.dialogEditClient.open(CustomDialogComponent, {
      panelClass: 'dialog-background',
      data: {
        elementCopy: copy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      Object.assign(element, result);
    });
  }

  deleteClient(element: any) {

    const dialogRef = this.dialogDeleteClient.open(DeleteClientDialogComponent, {
      panelClass: 'dialog-background',
      data: {
        elementCopy: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialogDelete');
      } else {
        this.dataSourceDevices = [];
        this.dataSourceSites = [];
        let index = this.dataSourceClients.data.findIndex(record => record.id === result.id);

        const tempData = this.dataSourceClients.data;
        tempData.splice(index, 1);
        this.dataSourceClients.data = tempData;
      }
    });
  }
  //--------------------------------------------------------------------
  selectedTabChange() {
    console.log('tabvheee');
  }
  // --------------- Site functionality
  addSiteForClient(clientId: number) {
    const dialogRef = this.dialogNewSite.open(AddSiteCustomDialogComponent, {
      panelClass: 'dialog-background',
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
    let copy = Object.assign({}, element);
    const dialogRef = this.dialogEditSite.open(EditSiteCustomDialogComponent, {
      panelClass: 'dialog-background',
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

  deleteSite(element: any) {

    const dialogRef = this.dialogDeleteSite.open(DeleteSiteDialogComponent, {
      panelClass: 'dialog-background',
      data: {
        elementCopy: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialogDelete');
      } else {
        this.dataSourceDevices = [];
        let index = this.dataSourceSites.data.findIndex(record => record.id === result.id);

        const tempData = this.dataSourceSites.data;
        tempData.splice(index, 1);
        this.dataSourceSites.data = tempData;
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
      panelClass: 'dialog-background'
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
    let copy = Object.assign({}, element);

    const dialogRef = this.dialogEditDeviceModel.open(EditDeviceModelDialogComponent, {
      panelClass: 'dialog-background',
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

  deleteDevice(element: any) {

    const dialogRef = this.dialogDeleteDevice.open(DeleteDeviceDialogComponent, {
      panelClass: 'dialog-background',
      data: {
        elementCopy: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialogDelete');
      } else {
        let index = this.dataSourceDevices.data.findIndex(record => record.id === result.id);

        const tempData = this.dataSourceDevices.data;
        tempData.splice(index, 1);
        this.dataSourceDevices.data = tempData;
      }
    });
  }

  editDevice(element: any) {
    let copy = Object.assign({}, element);

    const dialogRef = this.dialogEditDevice.open(EditDeviceCustomDialogComponent, {
      panelClass: 'dialog-background',
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
      panelClass: 'dialog-background',
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
      panelClass: 'dialog-background',
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


  generateCertificate(elementId: any) {
    const dialogRef = this.dialogGenerateCert.open(GenerateCertificateCustomDialogComponent, {
      panelClass: 'dialog-background',
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

  generateProtocol(elementId: any) {
    const dialogRef = this.dialogGenerateCert.open(GenerateProtocolCustomDialogComponent, {
      panelClass: 'dialog-background',
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
  searchDocuments() {
    let dateF = new Date(this.dateFrom);
    let dateT = new Date(this.dateTo);

    let dateFStr = this.transformDate(dateF);
    let dateTstr = this.transformDate(dateT);

    this.documentResults = [];
    this.docGeneratorService.searchExpiredDocuments(dateFStr, dateTstr).subscribe(documentResults => {
      this.documentResults = documentResults;
      this.dataSourceDocuments = new MatTableDataSource(this.documentResults);
    })
  }

  previewDocument(doc: any) {
    let docId = doc.id;
    const dialogRef = this.dialogAuth.open(AuthDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('closedDialogAuth');
      } else {
        this.docGeneratorService.previewDocument(docId, result).subscribe(documentResults => {
          fileSaver.saveAs(documentResults, doc.documentName);
        },
          (error) => {
            this.snackBar.open('Достъпът е отказан. Oпитайте отново.', '', {
              duration: 5000,
            });
            console.error('zzzzzzzzz', error);
          })
      }
    });

  }

  transformDate(date) {
    return formatDate(date, 'dd-MM-yyyy', this.locale);
  }

}