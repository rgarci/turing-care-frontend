import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private  route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }
  profile(){
    this.router.navigate(['doctors/{{idDoctor}}/profile']);
  }
}
