import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientSiteComponentComponent } from './client-site-component/client-site-component.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { CashRegisterService } from './providers/cash-register.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpModule } from '@angular/http';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomDialogComponent } from './dialogs/edit-client-custom-dialog/custom-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddClientCustomDialogComponent } from './dialogs/add-client-custom-dialog/add-client-custom-dialog.component';
import { AddSiteCustomDialogComponent } from './dialogs/add-site-custom-dialog/add-site-custom-dialog.component';
import { EditSiteCustomDialogComponent } from './dialogs/edit-site-custom-dialog/edit-site-custom-dialog.component';
import { SiteServiceService } from './providers/site-service.service';
import { DeviceModelService } from './providers/device-model.service';
import { AddDeviceModelDialogComponent } from './dialogs/add-device-model-dialog/add-device-model-dialog.component';
import { EditDeviceModelDialogComponent } from './dialogs/edit-device-model-dialog/edit-device-model-dialog.component';
import { AddDeviceCustomDialogComponent } from './dialogs/add-device-custom-dialog/add-device-custom-dialog.component';
import { EditDeviceCustomDialogComponent } from './dialogs/edit-device-custom-dialog/edit-device-custom-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { DeviceService } from './providers/device.service';
import { GenerateDocumentsCustomDialogComponent } from './dialogs/generate-documents-custom-dialog/generate-documents-custom-dialog.component';
import { DocumentGeneratorService } from './providers/document-generator.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MomentModule } from 'angular2-moment';
import { AuthDialogComponent } from './dialogs/auth-dialog/auth-dialog.component';
import { TabGroupBasicExampleComponent } from './tab-group-basic-example/tab-group-basic-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientSiteComponentComponent,
    CustomDialogComponent,
    CustomDialogComponent,
    AddClientCustomDialogComponent,
    AddSiteCustomDialogComponent,
    EditSiteCustomDialogComponent,
    AddDeviceModelDialogComponent,
    EditDeviceModelDialogComponent,
    AddDeviceCustomDialogComponent,
    EditDeviceCustomDialogComponent,
    GenerateDocumentsCustomDialogComponent,
    AuthDialogComponent,
    TabGroupBasicExampleComponent
    
  ],
  entryComponents: [AuthDialogComponent, GenerateDocumentsCustomDialogComponent,CustomDialogComponent,AddClientCustomDialogComponent,AddSiteCustomDialogComponent,EditSiteCustomDialogComponent,AddDeviceModelDialogComponent,EditDeviceModelDialogComponent,AddDeviceCustomDialogComponent,EditDeviceCustomDialogComponent],
  imports: [
    MomentModule,
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    HttpClientModule,
    MatTabsModule,
    HttpModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [MatDatepickerModule,DocumentGeneratorService, CashRegisterService, SiteServiceService, DeviceModelService, DeviceService],
  bootstrap: [ClientSiteComponentComponent]
})
export class AppModule { }
