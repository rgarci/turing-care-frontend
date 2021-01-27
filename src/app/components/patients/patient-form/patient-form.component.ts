import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Patient } from 'src/app/interfaces/patients/patient';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {GetPatientsService} from "../../../services/patients/get-patients.service";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  frmReactivo = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    alergies: [''],
    previousSurgery: [''],
    cronicIllness: [''],
    treatments: ['']
  });
  token: string;
  idDoctor: number;
  title: string;

  constructor(private svcPatient : GetPatientsService, private fb : FormBuilder, public dialogRef: MatDialogRef<PatientFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.token = data.token;
    this.idDoctor = data.idDoctor;
    this.title = data.title;
    console.log(data);
  }

  ngOnInit(): void {
  }

  save(){

    var fecha = new Date(this.frmReactivo.get('birthdate').value);

     const patient : Patient = {
      "paciente_id": null,
      "doctor_id": this.idDoctor,
      "nombre": this.frmReactivo.get('firstName').value,
      "apellido_paterno": this.frmReactivo.get('lastName').value,
      "apellido_materno": this.frmReactivo.get('secondLastName').value,
      "fecha_nacimiento": fecha,
      "email": this.frmReactivo.get('email').value,
      "sexo": this.frmReactivo.get('gender').value,
      "telefono": this.frmReactivo.get('phone').value,
      "alergias": this.frmReactivo.get('alergies').value,
      "operaciones_previas": this.frmReactivo.get('previousSurgery').value,
      "enfermedades_cronicas": this.frmReactivo.get('cronicIllness').value,
      "tratamientos_vigentes": this.frmReactivo.get('treatments').value
    }

    this.svcPatient.createPatient(patient).then(r =>
      {
       this.dialogRef.close(r);
      });
  }

}
