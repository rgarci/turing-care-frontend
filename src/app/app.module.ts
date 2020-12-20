import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { RegistersTableComponent } from './components/registers-table/registers-table.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientDataCardComponent } from './components/patient-data-card/patient-data-card.component';
import { RegisterDetailsComponent } from './components/register-details/register-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistersTableComponent,
    PatientDetailsComponent,
    PatientDataCardComponent,
    RegisterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
