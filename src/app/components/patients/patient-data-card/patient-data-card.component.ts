import { Component, Input, OnInit } from '@angular/core';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import {Patient} from "../../../interfaces/patients/patient";

@Component({
  selector: 'app-patient-data-card',
  templateUrl: './patient-data-card.component.html',
  styleUrls: ['./patient-data-card.component.css']
})
export class PatientDataCardComponent implements OnInit{

  @Input() parentData;
  @Input("patients") patients : Patient;

  ngOnInit(): void {
  }

}
