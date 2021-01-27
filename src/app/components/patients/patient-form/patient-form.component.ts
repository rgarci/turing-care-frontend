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
  idDoctor: number;
  idPaciente:number;
  title: string;

  constructor(private svcPatient : GetPatientsService, private fb : FormBuilder, public dialogRef: MatDialogRef<PatientFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.idDoctor = data.idDoctor;
    this.title = data.title;
    //pordefault. se cambia cuando se actualiza o se crea un paciente.
    this.idPaciente = null;
    if (data.paciente){
      this.frmReactivo.controls.firstName.setValue(data.paciente.nombre);
      this.frmReactivo.controls.lastName.setValue(data.paciente.apellido_paterno);
      this.frmReactivo.controls.secondLastName.setValue(data.paciente.apellido_materno);
      this.frmReactivo.controls.gender.setValue(data.paciente.sexo);
      this.frmReactivo.controls.birthdate.setValue(data.paciente.fecha_nacimiento);
      this.frmReactivo.controls.email.setValue(data.paciente.email);
      this.frmReactivo.controls.phone.setValue(data.paciente.telefono);
      this.frmReactivo.controls.alergies.setValue(data.paciente.alergias);
      this.frmReactivo.controls.previousSurgery.setValue(data.paciente.operaciones_previas);
      this.frmReactivo.controls.cronicIllness.setValue(data.paciente.enfermedades_cronicas);
      this.frmReactivo.controls.treatments.setValue(data.paciente.tratamientos_vigentes);
    }
    console.log(data);
  }

  ngOnInit(): void {}

  save(){
    if(this.data.paciente) {
      this.idPaciente = this.data.paciente.paciente_id;
    }
    var fecha = new Date(this.frmReactivo.get('birthdate').value);

     const patient : Patient = {
      "paciente_id": this.idPaciente,
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

    if (this.data.paciente) { //se actualiza
      this.svcPatient.updatePatient(patient).then(r =>
      {
        this.dialogRef.close(r);
      });
    } else {
      this.svcPatient.createPatient(patient).then(r =>
      {
        this.dialogRef.close(r);
      });
    }//se crea

  }

}
