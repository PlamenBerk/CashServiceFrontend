import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientSiteComponentComponent } from './client-site-component/client-site-component.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CashRegisterService } from './providers/cash-register.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpModule } from '@angular/http';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomDialogComponent } from './edit-client-custom-dialog/custom-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddClientCustomDialogComponent } from './add-client-custom-dialog/add-client-custom-dialog.component';
import { AddSiteCustomDialogComponent } from './add-site-custom-dialog/add-site-custom-dialog.component';
import { EditSiteCustomDialogComponent } from './edit-site-custom-dialog/edit-site-custom-dialog.component';
import { SiteServiceService } from './providers/site-service.service';
import { DeviceModelService } from './providers/device-model.service';
import { AddDeviceModelDialogComponent } from './add-device-model-dialog/add-device-model-dialog.component';
import { EditDeviceModelDialogComponent } from './edit-device-model-dialog/edit-device-model-dialog.component';


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
    
  ],
  entryComponents: [CustomDialogComponent,AddClientCustomDialogComponent,AddSiteCustomDialogComponent,EditSiteCustomDialogComponent,AddDeviceModelDialogComponent,EditDeviceModelDialogComponent],
  imports: [
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
    MatTooltipModule  
  ],
  providers: [CashRegisterService, SiteServiceService, DeviceModelService],
  bootstrap: [ClientSiteComponentComponent]
})
export class AppModule { }
