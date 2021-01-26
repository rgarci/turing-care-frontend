import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/interfaces/patients/paciente';
import { Patient } from 'src/app/interfaces/patients/patient';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';

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
    email:['', Validators.required],
    phone: ['', Validators.required],
    alergies: [''],
    previousSurgery: [''],
    cronicIllness: [''],
    treatments: ['']
  });
  token: string;
  idDoctor: number;
  constructor(private svcPatient : GetPatientsService, private fb : FormBuilder, public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.token = data.token;
      this.idDoctor = data.idDoctor
    }

  ngOnInit(): void {
  }

  save(){

    var fecha = new Date(this.frmReactivo.get('birthdate').value);

    var day = fecha.getDate();
    var month = fecha.getMonth()+1;
    var year = fecha.getFullYear();

     var fechaCast  = month + '/' + day + '/' + year;

     console.log(fechaCast);
     console.log(this.token);
     

     console.log(this.frmReactivo.get('gender').value);

    const patient : Paciente = {
      "pacienteId": null,
      "clinicaId": 1,
      "medicoId": this.idDoctor,
      "nombre": this.frmReactivo.get('firstName').value,
      "apellidoPaterno": this.frmReactivo.get('lastName').value,
      "apellidoMaterno": this.frmReactivo.get('secondLastName').value,
      "fechaNacimiento": fechaCast,
      "email": this.frmReactivo.get('email').value,
      "sexo": this.frmReactivo.get('gender').value,
      "telefono": this.frmReactivo.get('phone').value,
      "alergias": this.frmReactivo.get('alergies').value,
      "operacionesPrevias": this.frmReactivo.get('previousSurgery').value,
      "enfermedadesCronicas": this.frmReactivo.get('cronicIllness').value,
      "tratamientosVigentes": this.frmReactivo.get('treatments').value
    
    }

    this.svcPatient.createPaciente(patient, this.token);
    this.dialogRef.close(patient);
  }

}
