import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import { Doctor } from 'src/app/interfaces/doctors/doctor';
import { User } from 'src/app/interfaces/doctors/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})

export class DoctorFormComponent implements OnInit {

  registerFormTemplate = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    secondlastName: ['', Validators.required],
    curp: ['', Validators.required],
    email:['', Validators.required],
    phone:['', Validators.required],
    cedula: ['', Validators.required],
    medicalAreas: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private loginSvc: LoginService, private fb: FormBuilder, private dialogRef: MatDialogRef<DoctorFormComponent>) {
  }

  ngOnInit(): void {
  }

  register() {

    const bodyUser = {
      "username":this.registerFormTemplate.get('username').value,
      "password":this.registerFormTemplate.get('password').value,
      "role":"doctor"
    }
    this.loginSvc.registerUser(bodyUser).then((response) => {
        var user : User = response;

        const body : Doctor= {
          "clinicaId": 1,
          "usuarioId": user.usuarioId,
          "nombre": this.registerFormTemplate.get('firstName').value,
          "apellidoPaterno": this.registerFormTemplate.get('lastName').value,
          "apellidoMaterno": this.registerFormTemplate.get('secondlastName').value,
          "curp" : this.registerFormTemplate.get('curp').value,
          "urlCedulta" :this.registerFormTemplate.get('cedula').value,
          "urlFoto": "",
          "especialidad" : this.registerFormTemplate.get('medicalAreas').value,
          "status" : "activo",
          "email" : this.registerFormTemplate.get('email').value,
          "telefono" : this.registerFormTemplate.get('phone').value
        }

        this.loginSvc.registerDoctor(body, user.token);
        alert("El usuario" + bodyUser.username + " se ha registrado correctamente");
    }, (error) => {
      alert("Error: " + error.statusText +"No se pudo registrar correctamente")
    })
    
    

    this.dialogRef.close(this.registerFormTemplate.value);
  }
}
