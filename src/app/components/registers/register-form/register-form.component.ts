import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {register} from "ts-node";
import {RegisterItf} from "../../../interfaces/registers/register-itf";
import {GetRegistersService} from "../../../services/registers/get-registers.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  frmReactivo = this.fb.group({
    date: ['', Validators.required],
    symptoms: ['', Validators.required],
    topic: ['', Validators.required],
    description: ['', Validators.required],
    medications: ['', Validators.required],
    observations: ['', Validators.required],
    type_of_treatment: ['', Validators.required],
    treatment_monitoring: ['']

  });
  token: string;
  idDoctor: number;
  title: string;
  idPatient: number;
  idRegister : number;

  constructor(private fb: FormBuilder, private srvRegistro : GetRegistersService, public dialogRef: MatDialogRef<RegisterFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.token = data.token;
    this.idDoctor = data.idDoctor;
    this.title = data.title;
    this.idPatient = data.idPatient;
    this.idRegister = null;
    if (data.registro){
      this.frmReactivo.controls.date.setValue(data.registro.fecha_cita);
      this.frmReactivo.controls.symptoms.setValue(data.registro.sintomas);

      this.frmReactivo.controls.description.setValue(data.registro.descripcion);
      this.frmReactivo.controls.topic.setValue(data.registro.asunto);

      this.frmReactivo.controls.medications.setValue(data.registro.medicamento_recetado);

      this.frmReactivo.controls.observations.setValue(data.registro.observaciones);

      this.frmReactivo.controls.type_of_treatment.setValue(data.registro.tipo_tratamiento);
      this.frmReactivo.controls.treatment_monitoring.setValue(data.registro.seguimiento_tratamiento);
    }
  }

  ngOnInit(): void {
  }

  save(){
    if (this.data.registro){
      this.idRegister = this.data.registro.idRegister;
    }
    var fecha = new Date(this.frmReactivo.get('date').value);
    const registro : RegisterItf = {
      registro_id: this.idRegister,
      doctor_id: this.idDoctor,
      paciente_id: this.idPatient,
      asunto: this.frmReactivo.get('topic').value,
      descripcion: this.frmReactivo.get('description').value,
      fecha_registro: fecha,
      fecha_actualizacion: fecha,
      fecha_cita: fecha,
      medicamento_recetado : this.frmReactivo.get('medications').value,
      observaciones: this.frmReactivo.get('observations').value,
      seguimiento_tratamiento: this.frmReactivo.get('treatment_monitoring').value,
      sintomas: this.frmReactivo.get('symptoms').value,
      tipo_tratamiento: this.frmReactivo.get('type_of_treatment').value
    };

    if (this.data.registro){
      this.srvRegistro.updateRegister(registro).then(r =>
      {
        this.dialogRef.close(r);
      });
    }else {
      this.srvRegistro.createRegister(registro).then(r =>
      {
        this.dialogRef.close(r);
      });
    }

  }

}
