
import { Component, Input,OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
}
