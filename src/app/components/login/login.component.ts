import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DoctorFormComponent} from '../doctors/doctor-form/doctor-form.component';
import {AuthService} from '../../services/auth/auth.service';
import {first} from "rxjs/operators";

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
    //Emits only the first value returned on the login observable.As a suscriber to act only after a
    //change.
    this.loading = true;
    this.authService.login(this.loginFrmTemplate.get('user').value, this.loginFrmTemplate.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.authService.currentUserValue);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          //TODO: handle error
          alert(error);
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
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!

      // alert('¡REGISTRO ENVIADO!');
    });

  }
}
