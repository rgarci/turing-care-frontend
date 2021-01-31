import { Component, OnInit } from '@angular/core';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Doctor} from '../../../interfaces/doctors/doctor';
import {DoctorFormComponent} from '../doctor-form/doctor-form.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {GetClinicService} from '../../../services/clinics/get-clinic.service';
import {Clinic} from '../../../interfaces/clinics/clinic';
import {AddressPipe} from '../../../pipes/address.pipe';
import {AlertBars} from "../../../_helpers/alert-bars";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor;
  clinica: Clinic;
  idDoctor: number;
  cedula: string;
  url_foto: string;

  title = 'turingcare';
  elementType = 'canvas';
  value;

  constructor(private getDoctorService: GetDoctorsService,
              private  route: ActivatedRoute,
              private router: Router, public dialogForm: MatDialog, private authSrv: AuthenticationService,
              private clinicaSrv: GetClinicService,
              private addressPipe: AddressPipe,
              private  alertBars: AlertBars) { }

  ngOnInit(): void {
   this.idDoctor = +this.route.snapshot.paramMap.get('idDoctor');
   this.getDoctor(this.idDoctor);
   this.getDoctorService.getInfoDoctorById(this.idDoctor).then((response) => {
      this.value = JSON.stringify(response);
      console.log(response);
      console.log(this.value);
    }, (error) => {
      console.log('Error cargando doctor: ' + error.statusText);
    });
  }

  getDoctor = (id: number) => {
       this.getDoctorService.getDoctorById(id)
      .then((response) => {
        this.doctor = response;
        this.getClinica(this.doctor.clinica_id);
      }, (error) => {
        this.alertBars.openErrorSnackBar("Error cargando doctor");
        console.log('Error en obtener doctor: ' + error.statusText + this.idDoctor);
      });
  }

  editDoctor = (doctor_id: number) => {
    const dialogRef = this.dialogForm.open(DoctorFormComponent, {
      data: {
        title: 'Editar doctor',
        idUser: this.authSrv.currentUserValue.user_id,
        doctor: {
          doctor_id,
          nombre: this.doctor.nombre,
          apellido_paterno: this.doctor.apellido_paterno,
          apellido_materno: this.doctor.apellido_materno,
          nombre_clinica: this.clinica.nombre,
          direccion_clinica: this.addressPipe.transform(this.clinica),
          idClinica : this.doctor.clinica_id,
          status: this.doctor.status,
          email: this.doctor.email,
          telefono: this.doctor.telefono,
          curp: this.doctor.curp,
          especialidad: this.doctor.especialidad,
          cedula: this.cedula
        }
      }
    });
  }

  getClinica = (id: number) => {
    this.clinicaSrv.getClinicById(id)
      .then((response) => {
        this.clinica = response;
      }, (error) => {
        console.log('Error: ' + error.statusText + id);
      });
  }
}
