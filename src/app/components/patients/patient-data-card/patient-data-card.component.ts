import { Component, Input, OnInit } from '@angular/core';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import {Patient} from "../../../interfaces/patients/patient";
import {PatientFormComponent} from "../patient-form/patient-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-patient-data-card',
  templateUrl: './patient-data-card.component.html',
  styleUrls: ['./patient-data-card.component.css']
})
export class PatientDataCardComponent implements OnInit{

  @Input() parentData;
  @Input("patients") patients: Patient;

  constructor(public dialog: MatDialog) {
  }
  ngOnInit(): void {
  }

  editPatient() {
    this.openCreateForm();
  }
  openCreateForm() {
    const dialogRef = this.dialog.open(PatientFormComponent,  {
      width:'100%',
      data: {
        title: 'Editar paciente',
        nombre: this.patients.nombre,
        apellido_paterno: this.patients.apellido_paterno,
        apellido_materno: this.patients.apellido_materno,
        email: this.patients.email,
        telefono: this.patients.telefono,
        fecha_nacimiento: this.patients.fecha_nacimiento,
        sexo: this.patients.sexo,
        alergias: this.patients.alergias,
        operaciones_previas: this.patients.operaciones_previas,
        enfermedades_cronicas: this.patients.enfermedades_cronicas,
        tratamientos_vigentes: this.patients.tratamientos_vigentes,
      }
    });

    dialogRef.afterClosed().subscribe((result)  => {
      console.log('Dialog result:  %O', result);
      if(result) {this.patients = result};
    });
  }
}
