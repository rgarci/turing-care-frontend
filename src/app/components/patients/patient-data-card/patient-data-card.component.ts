import { Component, Input, OnInit } from '@angular/core';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';

@Component({
  selector: 'app-patient-data-card',
  templateUrl: './patient-data-card.component.html',
  styleUrls: ['./patient-data-card.component.css']
})
export class PatientDataCardComponent implements OnInit{

  @Input() parentData;
  @Input("patients") patients : PatientItf;

  birthDate : string;
  gender : string;
  alergies : string;
  previousSurgery: string;
  cronicIllness: string;
  treatments: string;

  ngOnInit(): void {
    this.birthDate = this.patients.results[0].registered.date.substr(0, 10);
    this.gender = this.patients.results[0].gender;
    this.alergies = this.patients.results[0].login.md5.concat(this.patients.results[0].login.md5);
    this.previousSurgery = this.patients.results[0].login.md5.concat(this.patients.results[0].login.md5);
    this.cronicIllness = this.patients.results[0].login.md5.concat(this.patients.results[0].login.md5);
    this.treatments = this.patients.results[0].login.md5.concat(this.patients.results[0].login.md5);
  }

}
