import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../classes/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFrmTemplate = new LoginModel('', '');
  hidepswd = true;
  logged = false;
  constructor() { }
  ngOnInit(): void {
  }

  login() {
    this.logged = true;
    alert("USer:" + this.loginFrmTemplate.user + "psw:" + this.loginFrmTemplate.password );
  }

  hidepassword(e) {
    this.hidepswd = !this.hidepswd;
    e.preventDefault();
  }
}
