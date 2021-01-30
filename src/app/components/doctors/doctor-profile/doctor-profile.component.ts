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

  title = 'turingcare';
  elementType = 'canvas';
  value;

  constructor(private getDoctorService: GetDoctorsService,
              private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
   this.idDoctor = +this.route.snapshot.paramMap.get('idDoctor');
   this.getDoctor(this.idDoctor);
   this.getDoctorService.getInfoDoctorById(this.idDoctor).then((response) => {
      this.value = JSON.stringify(response);
      console.log(response);
      console.log(this.value);
      
      
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
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
