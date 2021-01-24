import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { PatientListComponent } from './components/patients/patient-list/patient-list.component';
import {LoginComponent} from './components/doctors/login/login.component';
import {DoctorProfileComponent} from './components/doctors/doctor-profile/doctor-profile.component';
import {DoctorListComponent} from './components/doctors/doctor-list/doctor-list.component';

const routes: Routes = [
  {path: "",  redirectTo: 'login', pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'patients/:idDoctor', component: PatientListComponent },
  { path: 'patient-details', component: PatientDetailsComponent },
  { path: 'noticias/:idDoctor', component: NewsListComponent },
  { path: 'perfil/:idDoctor', component: DoctorProfileComponent},
  { path: 'doctores', component: DoctorListComponent},
  { path: 'doctores/:idDoctor', component: DoctorProfileComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
