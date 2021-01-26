import { Component, OnInit } from '@angular/core';
import {DoctorItf} from '../../../interfaces/doctors/doctor-itf';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Doctor } from 'src/app/interfaces/doctors/doctor';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  doctor: Doctor;
  idDoctor : string;
  doctorName: string;
  token: string;


  // parametro de busqueda de la ruta : doctor/{id}/profile
  idBusqueda: string;


  constructor(private getDoctorService: GetDoctorsService,
              private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    this.doctorName = this.route.snapshot.paramMap.get('nombre');
    this.token = this.route.snapshot.paramMap.get('token')
   this.idBusqueda = '1881057453';
   this.getDoctor();
  }

  getDoctor = () => {
       this.getDoctorService.getDoctorById(this.idDoctor, this.token)
      .then((response) => {
        this.doctor = response;
        
      }, (error) => {
        alert('Error: ' + error.statusText + this.idBusqueda);
      });
  }

  

}
