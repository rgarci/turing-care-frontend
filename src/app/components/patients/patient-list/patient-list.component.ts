import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Paciente } from 'src/app/interfaces/patients/paciente';
import { PacienteList } from 'src/app/interfaces/patients/pacienteList';
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
  dataSource : MatTableDataSource<Paciente>;
  doctorName : string;
  greeting : string;
  doctorGender : boolean;
  patients : PacienteList;
  idDoctor : string;
  token : string;
  columnsToDisplay = ['name' , 'phone' , 'age', 'actions'];

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute,
    private router : Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    console.log(this.idDoctor);
    
    this.buscar = '';
    this.doctorGender = true;
    this.token = this.route.snapshot.paramMap.get('token')
    this.doctorName = this.route.snapshot.paramMap.get('nombre');
    if(this.doctorGender){
      this.greeting = "Bienvenida ".concat(this.doctorName);
    }else{
      this.greeting = "Bienvenido ".concat(this.doctorName);
    }

    this.getPatientsSvc.getPatients(this.idDoctor, this.token).then((response) =>{
      this.patients = response;
      this.dataSource = new MatTableDataSource(this.patients.pacientes);
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
      width:'100%', data : {token: this.token, idDoctor : this.idDoctor}
    });

    dialogRef.afterClosed().subscribe(result  => {
      console.log('Dialog result:  %O', result);
    });
  }

  viewPatient(patientId : string){
    this.router.navigate(['patient-details' , {idPatient: patientId, idDoctor : this.idDoctor, token :this.token, nombre: this.doctorName}])
  }

}
