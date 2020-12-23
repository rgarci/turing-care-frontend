import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { PatientListComponent } from './components/patients/patient-list/patient-list.component';

const routes: Routes = [
  { path: 'patients/:idDoctor', component: PatientListComponent },
  { path: 'patient-details', component: PatientDetailsComponent },
  { path: 'noticias/:idDoctor', component: NewsListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
