import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Patient } from 'src/app/interfaces/patients/patient';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {GetDoctorsService} from "../../../services/doctors/get-doctors.service";

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
  patients : Patient[];
  idDoctor : number;
  columnsToDisplay = ['name' , 'phone' , 'age', 'actions'];

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute,
              private router : Router, public dialog: MatDialog,
              private authSrv: AuthenticationService,private docSrv: GetDoctorsService) { }

  ngOnInit(): void {
    if (this.authSrv.currentUserValue) {
      this.idDoctor = this.authSrv.currentUserValue.doctor.doctor_id;
    }
    this.buscar = '';

    this.getPatientsSvc.getPatients(this.idDoctor).then((response) => {
      this.patients = response;
      this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.paginator = this.paginator;

      this.docSrv.getDoctorById(this.idDoctor).then((response)=> {
        this.doctorName = response.nombre + ' ' + response.apellido_paterno + ' ' + response.apellido_materno;
        this.greeting = "Bienvenido/a, " + this.doctorName;
      }, (error) => {
        error.log('loading doctor information failed');
      });
    }, (error) => {
      //alert("Error: " + error.statusText);
    });
  }

  getPatient = (event: Event) =>{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateForm() {
    const dialogRef = this.dialog.open(PatientFormComponent,  {
      width:'100%',
      data: {
        idDoctor: this.idDoctor,
        title: 'Agregar paciente'
      }
    });

    dialogRef.afterClosed().subscribe((result)  => {
      console.log('Dialog result:  %O', result);
      if (result) {
        this.patients.push(result);
        this.refresh();
      }
    });
  }

  refresh(){
    this.dataSource = new MatTableDataSource(this.patients);
    this.dataSource.paginator = this.paginator;
  }
  viewPatient(patientId : string){
    this.router.navigate(['patient-details' , {idPatient: patientId, idDoctor : this.idDoctor}])
  }

}
