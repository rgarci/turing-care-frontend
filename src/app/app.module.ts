import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './components/login/login.component';
import { PatientListComponent } from './components/patients/patient-list/patient-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistersTableComponent } from './components/registers/registers-table/registers-table.component';
import { RegisterDetailsComponent } from './components/registers/register-details/register-details.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { PatientDataCardComponent } from './components/patients/patient-data-card/patient-data-card.component';
import { LocationDateToolbarComponent } from './components/location-date-toolbar/location-date-toolbar.component';
import { DoctorProfileComponent } from './components/doctors/doctor-profile/doctor-profile.component';
import {MatMenuModule} from '@angular/material/menu';

import { MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PatientFormComponent } from './components/patients/patient-form/patient-form.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DoctorFormComponent } from './components/doctors/doctor-form/doctor-form.component';
import { DoctorListComponent } from './components/doctors/doctor-list/doctor-list.component';
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthGuard} from "./_helpers/auth.guard";
import {AuthService} from "./services/auth/auth.service";
import {httpInterceptorProviders} from './_helpers/http-interceptors';
import {ErrorInterceptor} from "./_helpers/http-interceptors/error-interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PatientListComponent,
    RegistersTableComponent,
    PatientDetailsComponent,
    PatientDataCardComponent,
    RegisterDetailsComponent,
    LocationDateToolbarComponent,
    DoctorProfileComponent,
    PatientFormComponent,
    NewsListComponent,
    PageNotFoundComponent,
    DoctorFormComponent,
    DoctorListComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    HttpClientModule,
  ],
  providers: [ DatePipe,
  AuthGuard, AuthService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
