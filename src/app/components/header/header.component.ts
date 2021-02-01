
import { Component, Input,OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("idDoctor") idDoctor : number;
  currentUser: User;

  constructor(private  route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

   ngOnInit(): void {
  }

  getUserRole(){
    return this.authenticationService.getRole();
  }
  logout() {
    this.authenticationService.logout();
  }
}
