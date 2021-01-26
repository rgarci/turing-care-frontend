import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {DoctorItf} from '../../../interfaces/doctors/doctor-itf';
import {Doctor} from '../../../interfaces/doctors/doctor';
import {DoctorFormComponent} from '../doctor-form/doctor-form.component';

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
  doctors: DoctorItf;
  idDoctor: string;
  isChecked = true;

  columnsToDisplay = ['name' , 'hospital' , 'cedule', 'actions','status'];

  constructor(private getDoctorsSvc: GetDoctorsService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.greeting = 'Hola,admin';
    this.getDoctorsSvc.getDoctors(30).then((response) => {
      this.doctors = response;
      this.doctors.records.forEach(function(doctor){
        const cadena = doctor.fields.titular;
        doctor.fields.nombreDoctor =
          cadena.split('Dirección:')[0].replace('Director:', '');
        doctor.fields.direccion =
          cadena.split('Dirección:')[1].replace('Dirección:', '');
        doctor.fields.curp = 'AERW134MTXS3009';
        doctor.fields.cedula = 'AERW134MTXS3009';
        doctor.fields.status = false;
      });

      this.dataSource = new MatTableDataSource(this.doctors.records);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  getDoctor = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateForm() {
    const dialogRef = this.dialog.open(DoctorFormComponent,  {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result  => {
      console.log('Dialog result:  %O', result);
    });
  }

  viewDoctor(DoctorId: string){
    this.router.navigate(['doctores/' + DoctorId]);
  }

  separateDoctorFields = (doctor: Doctor) => {
    const cadena = doctor.fields.titular;
    doctor.fields.nombreDoctor =
      cadena.split('Dirección:')[0].replace('Director:', '');
    doctor.fields.direccion =
      cadena.split('Dirección:')[1].replace('Dirección:', '');
    doctor.fields.curp = 'AERW134MTXS3009';
  }
}
