import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

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

  constructor(private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
  }

  login() {
    if (this.loginFrmTemplate.get('user').value && this.loginFrmTemplate.get('password').value) {
      this.logged = true;
      this.idDoctor = this.loginFrmTemplate.get('user').value;
      this.router.navigate(['patients/:idDoctor' , {idDoctor : this.idDoctor}]);
    }
  }

  hidepassword(e) {
    this.hidepswd = !this.hidepswd;
    e.preventDefault();
  }
}
