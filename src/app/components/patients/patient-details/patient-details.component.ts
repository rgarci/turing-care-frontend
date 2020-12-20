import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patients : PatientItf;
  idPatient : string;

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getPatientsSvc.getPatient("123").then((response) =>{
      this.patients = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }
}
