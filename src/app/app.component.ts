import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/auth/authentication.service';
import {User} from './classes/user';
import { Doctor } from './interfaces/doctors/doctor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  title = 'turingcare';

  elementType = 'canvas';
  value;

  constructor(
    private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
  }

}
