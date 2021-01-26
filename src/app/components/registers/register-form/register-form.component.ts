import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/interfaces/patients/paciente';
import { RegistroPost } from 'src/app/interfaces/registers/registroPost';
import { Registros } from 'src/app/interfaces/registers/registros';
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  frmReactivo = this.fb.group({
    date: ['', Validators.required],
    asunto: ['', Validators.required],
    descripcion: ['', Validators.required],
    symptoms: ['', Validators.required],
    medications: ['', Validators.required],
    observations: ['', Validators.required],
    type_of_treatment: ['', Validators.required],
    treatment_monitoring: ['']

  })

  idPaciente:number;
  token:string;
  idDoctor: number
  constructor(private getRegister : GetRegistersService, private fb: FormBuilder, 
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.idPaciente = data.idPatient;
      this.token = data.token;
      this.idDoctor = data.idDoctor;
    }

  ngOnInit(): void {
  }

  save(){

    console.log(this.idPaciente);
    
    var fecha = new Date(this.frmReactivo.get('date').value);

    console.log(fecha);
    var day = fecha.getDate();
    var month = fecha.getMonth()+1;
    var year = fecha.getFullYear();

     var fechaCast  = month + '/' + day + '/' + year;

     console.log(fechaCast);

    const register : RegistroPost = {
      "asunto": this.frmReactivo.get('asunto').value,
      "descripcion":this.frmReactivo.get('descripcion').value,
      "sintomas":this.frmReactivo.get('symptoms').value,
      "observaciones":this.frmReactivo.get('observations').value,
      "tipoTratamiento":this.frmReactivo.get('type_of_treatment').value,
      "seguimientoTratamiento":this.frmReactivo.get('treatment_monitoring').value,
      "medicamentoRecetado":this.frmReactivo.get('medications').value,
      "fechaCita": fechaCast,
      "idMedico":this.idDoctor,
      "idPaciente":this.idPaciente
    }
    
    this.getRegister.createRegistro(register, this.token);

    this.dialogRef.close();
  }

}
