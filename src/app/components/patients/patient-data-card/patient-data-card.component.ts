import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/patients/paciente';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';

@Component({
  selector: 'app-patient-data-card',
  templateUrl: './patient-data-card.component.html',
  styleUrls: ['./patient-data-card.component.css']
})
export class PatientDataCardComponent implements OnInit{

  @Input() parentData;
  @Input("patients") patients : Paciente;

  birthDate : string;
  gender : string;
  alergies : string;
  previousSurgery: string;
  cronicIllness: string;
  treatments: string;

  ngOnInit(): void {
    this.birthDate = this.patients.fechaNacimiento;
    this.gender = this.patients.sexo;
    this.alergies = this.patients.alergias;
    this.previousSurgery = this.patients.operacionesPrevias;
    this.cronicIllness = this.patients.enfermedadesCronicas;
    this.treatments = this.patients.tratamientosVigentes;
  }

}
