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
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ClientSiteComponentComponent,
    CustomDialogComponent,
    CustomDialogComponent
  ],
  entryComponents: [CustomDialogComponent],
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
    ReactiveFormsModule    
  ],
  providers: [CashRegisterService],
  bootstrap: [ClientSiteComponentComponent]
})
export class AppModule { }
