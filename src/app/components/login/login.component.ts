import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DoctorFormComponent} from '../doctors/doctor-form/doctor-form.component';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidepswd = true;
  logged = false;
  idDoctor: number;
  errorLog = false;
  loginFrmTemplate = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  private loading: boolean;
  private returnUrl: string;

  constructor(private router: Router, private fb: FormBuilder, public dialogForm: MatDialog,
              private authService: AuthenticationService,
              private route: ActivatedRoute) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/patients',
        {idDoctor: this.authService.currentUserValue.doctor.doctor_id}]);
    }
  }
  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/patients';
  }

  login() {
    if (this.loginFrmTemplate.invalid) {
      return;
    }
    //Emits only the first value returned on the login observable.As a suscriber to act only after a
    //change.
    this.loading = true;
    this.authService.login(this.loginFrmTemplate.get('user').value, this.loginFrmTemplate.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/patients',
            {idDoctor: this.authService.currentUserValue.doctor.doctor_id}]);
        },
        error => {
          this.errorLog = true;
          console.log("Error en login "+ error);
          this.loading =false;
        });
  }

  hidepassword(e) {
    this.hidepswd = !this.hidepswd;
    e.preventDefault();
  }

  register(){
    const dialogRef = this.dialogForm.open(DoctorFormComponent, {
     data: {
        title: 'Bienvenido a TuringCare',
        subtitle: 'Llena estos datos y solicita tu registro',
        send_email: 'wendy@gmail.com'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
