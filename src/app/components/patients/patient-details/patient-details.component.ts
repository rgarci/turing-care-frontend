import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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
  idDoctor : string;

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.idPatient = this.route.snapshot.paramMap.get('idPatient');
    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    console.log("My input: " + this.idDoctor);
    console.log("patient: " + this.idPatient);

    this.getPatientsSvc.getPatient(this.idPatient).then((response) =>{
      this.patients = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }
}
