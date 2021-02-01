import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {DoctorItf} from '../../../interfaces/doctors/doctor-itf';
import {Doctor} from '../../../interfaces/doctors/doctor';
import {DoctorFormComponent} from '../doctor-form/doctor-form.component';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {AlertBars} from "../../../_helpers/alert-bars";
import {PatientFormComponent} from "../../patients/patient-form/patient-form.component";
import {Clinic} from "../../../interfaces/clinics/clinic";
import {GetClinicService} from "../../../services/clinics/get-clinic.service";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  buscar: string;
  dataSource: MatTableDataSource<Doctor>;
  doctorName: string;
  greeting: string;
  doctors: Doctor[];
  idDoctor: string;
  isChecked = true;
  clinicas : Clinic[];
  loading = false;

  columnsToDisplay = ['name' , 'phone' , 'email', 'actions', 'status'];

  constructor(private getDoctorsSvc: GetDoctorsService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog,private authSrv: AuthenticationService,private docSrv: GetDoctorsService,
              private alertBars: AlertBars, private clinicaSrv: GetClinicService) { }

  ngOnInit(): void {
    this.greeting = 'Hola,admin';
    this.getDoctorsSvc.getDoctors().then((response) => {
      this.doctors = response;
      this.dataSource = new MatTableDataSource(this.doctors);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      this.alertBars.openErrorSnackBar('Error cargando doctores');
      console.log("Error: " + error.statusText);
    });
  }

  getDoctor = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateForm() {

    const dialogRef = this.dialog.open(DoctorFormComponent,  {
      width:'100%',
      data: {
        idUser: this.authSrv.currentUserValue.user_id,
        title: 'Agregar doctor',
        create:true,
        saveAction:'Guardar',
      }
    });
  }

  viewDoctor(DoctorId: string){
    this.router.navigate(['doctores/' + DoctorId]);
  }
}
