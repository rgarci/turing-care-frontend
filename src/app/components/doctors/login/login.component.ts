import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DoctorFormComponent} from '../doctor-form/doctor-form.component';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/interfaces/doctors/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User;
  hidepswd = true;
  logged = false;
  idDoctor: string;
  loginFrmTemplate = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private svclogin : LoginService, private router: Router, private fb: FormBuilder, public dialogForm: MatDialog) { }
  ngOnInit(): void {
  }

  login() {

    if (this.loginFrmTemplate.get('user').value && this.loginFrmTemplate.get('password').value) {
      const body = {
        "username":this.loginFrmTemplate.get('user').value,
        "password":this.loginFrmTemplate.get('password').value
      };
      console.log("entramons");
      this.svclogin.login(body).then((response) =>{
        this.user = response; 
        this.logged = true;
        this.idDoctor = this.loginFrmTemplate.get('user').value;
        this.router.navigate(['patients/:idDoctor' , {idDoctor : this.user.messageMedico.medicoId, 
          token: this.user.token, 
          nombre: this.user.messageMedico.nombre }]);
      }, (error) => {
        alert("Error: " + error.statusText)
      });
     
    }
  }

  hidepassword(e) {
    this.hidepswd = !this.hidepswd;
    e.preventDefault();
  }

  register(){
    const dialogRef = this.dialogForm.open(DoctorFormComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!

      // alert('¡REGISTRO ENVIADO!');
    });

  }
}
