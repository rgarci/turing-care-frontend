
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("idDoctor") idDoctor : string;
  constructor(private  route: ActivatedRoute,
              private router: Router) { }

   ngOnInit(): void {
  }
  profile(){
    this.router.navigate(['doctors/{{idDoctor}}/profile']);
  }
}
