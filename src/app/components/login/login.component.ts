import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DoctorFormComponent} from '../doctors/doctor-form/doctor-form.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidepswd = true;
  logged = false;
  idDoctor: string;
  loginFrmTemplate = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  private loading: boolean;
  private returnUrl: string;

  constructor(private router: Router, private fb: FormBuilder, public dialogForm: MatDialog,
              private authService: AuthService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    if (this.loginFrmTemplate.invalid) {
      return;
    }
//TODO: authSrv
    //Emits only the first value returned on the login observable.
    let us = this.authService.login(this.loginFrmTemplate.get('user').value,
      this.loginFrmTemplate.get('password').value);

    this.router.navigate(['patients', {idDoctor : us.id}]);
      // .pipe(first())
      // .subscribe(
      //   data => {
      //     this.router.navigate([this.returnUrl]);
      //   },
      //   error => {
      //     alert(error);
      //     this.loading = false;
      //   });

    // if (this.loginFrmTemplate.get('user').value && this.loginFrmTemplate.get('password').value) {
    //   this.logged = true;
    //   this.idDoctor = this.loginFrmTemplate.get('user').value;
    //   this.router.navigate(['patients', {idDoctor : this.idDoctor}]);
    // }
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
