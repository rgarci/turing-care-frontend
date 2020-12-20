import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients : PatientItf;
  idDoctor : string;
  columnsToDisplay = ['Id', 'name' , 'phone' , 'age'];

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getPatientsSvc.getPatients("123").then((response) =>{
      this.patients = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

}
