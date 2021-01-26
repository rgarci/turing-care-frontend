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

  birthDate : Date;
  gender : string;
  alergies : string;
  previousSurgery: string;
  cronicIllness: string;
  treatments: string;

  ngOnInit(): void {
    this.birthDate = this.patients.results[0].fecha_nacimiento;
    this.gender = this.patients.results[0].sexo;
    this.alergies = this.patients.results[0].alergias;
    this.previousSurgery = this.patients.results[0].operaciones_previas;
    this.cronicIllness = this.patients.results[0].enfermedades_cronicas;
    this.treatments = this.patients.results[0].tratamientos_vigentes;
  }

}
