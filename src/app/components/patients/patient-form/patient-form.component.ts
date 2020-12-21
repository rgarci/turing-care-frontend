import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/interfaces/patients/patient';

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
    alergies: [''],
    previousSurgery: [''],
    cronicIllness: [''],
    treatments: ['']
  });
  constructor(private fb : FormBuilder, public dialogRef: MatDialogRef<PatientFormComponent>) { }

  ngOnInit(): void {
  }

  save(){
    const patient : Patient = {
      "gender": this.frmReactivo.get('gender').value,
      "name": {
      "title": this.frmReactivo.get('firstName').value,
      "first": this.frmReactivo.get('lastName').value,
      "last": this.frmReactivo.get('secondLastName').value
      },
      "registered": {
          "date": this.frmReactivo.get('birthdate').value,
          "age": 22
          },
      "phone" : 'string',
      "id": {
          "name": 'string',
          "value": 'string'
      },
      "login": {
          "uuid": this.frmReactivo.get('alergies').value,
          "username": this.frmReactivo.get('previousSurgery').value,
          "password": this.frmReactivo.get('cronicIllness').value,
          "salt": this.frmReactivo.get('treatments').value,
          "md5": 'string',
          "sha1": 'string',
          "sha256": 'string'
      }
    }
    this.dialogRef.close(patient);
  }

}
