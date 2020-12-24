import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Patient } from 'src/app/interfaces/patients/patient';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  buscar : string;
  dataSource : MatTableDataSource<Patient>;
  doctorName : string;
  greeting : string;
  doctorGender : boolean;
  patients : PatientItf;
  idDoctor : string;
  columnsToDisplay = ['name' , 'phone' , 'age', 'actions'];

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute, 
    private router : Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.idDoctor = "provisionalId";
    this.buscar = '';
    this.doctorGender = true;
    this.doctorName = "Daniela";
    if(this.doctorGender){
      this.greeting = "Bienvenida Doctora ".concat(this.doctorName);
    }else{
      this.greeting = "Bienvenido Doctor ".concat(this.doctorName);
    }
    
    this.getPatientsSvc.getPatients("123").then((response) =>{
      this.patients = response;
      this.dataSource = new MatTableDataSource(this.patients.results);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      alert("Error: " + error.statusText);
    });
  }

  getPatient = (event: Event) =>{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateForm() {
    const dialogRef = this.dialog.open(PatientFormComponent,  {
      width:'100%'
    });

    dialogRef.afterClosed().subscribe(result  => {
      console.log('Dialog result:  %O', result);
    });
  }

  viewPatient(patientId : string){
    this.router.navigate(['patient-details' , {idPatient: patientId, idDoctor : this.idDoctor}])
  }

}
