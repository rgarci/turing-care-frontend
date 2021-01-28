import { Component, OnInit } from '@angular/core';
import {DoctorItf} from '../../../interfaces/doctors/doctor-itf';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Doctor} from "../../../interfaces/doctors/doctor";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor;
  idDoctor: number;
  // parametro de busqueda de la ruta : doctor/{id}/profile
  idBusqueda: number;


  constructor(private getDoctorService: GetDoctorsService,
              private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
   this.idDoctor = +this.route.snapshot.paramMap.get('idDoctor');

   console.log(typeof this.idDoctor);
   this.getDoctor(this.idDoctor);
  }

  getDoctor = (id: number) => {
       this.getDoctorService.getDoctorById(id)
      .then((response) => {
        this.doctor = response;
      }, (error) => {
        alert('Error: ' + error.statusText + this.idBusqueda);
      });
  }
}
