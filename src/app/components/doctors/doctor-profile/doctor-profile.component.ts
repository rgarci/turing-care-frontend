import { Component, OnInit } from '@angular/core';
import {DoctorItf} from '../../../interfaces/doctors/doctor-itf';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: DoctorItf;
  // parametro de busqueda de la ruta : doctor/{id}/profile
  idBusqueda: string;

  constructor(private getDoctorService: GetDoctorsService,
              private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
   this.idBusqueda = '1881057453';
   this.getDoctor();
  }

  getDoctor = () => {
       this.getDoctorService.getDoctorById(this.idBusqueda)
      .then((response) => {
        this.doctor = response;
        this.separateFields();
      }, (error) => {
        alert('Error: ' + error.statusText + this.idBusqueda);
      });
  }

  separateFields = () => {
    let cadena = this.doctor.records[0].fields.titular;
    this.doctor.records[0].fields.nombreDoctor =
      cadena.split("Dirección:")[0].replace("Director:","");
    this.doctor.records[0].fields.direccion =
      cadena.split("Dirección:")[1].replace("Dirección:","");
    this.doctor.records[0].fields.curp = 'AERW134MTXS3009';
  }

}
