
import { Component, Input,OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input("idDoctor") idDoctor : string;
  @Input("token") token : string;
  @Input("doctorName") nombre : string;
  constructor(private  route: ActivatedRoute,
              private router: Router) { }

   ngOnInit(): void {
  }

  seePatient(){
    this.router.navigate(['patients/'+this.idDoctor , {idDoctor : this.idDoctor, 
      token: this.token, 
      nombre: this.nombre }]);
  }

  seeNews(){
    this.router.navigate(['noticias/'+this.idDoctor , {idDoctor : this.idDoctor, 
      token: this.token, 
      nombre: this.nombre }]);
  }

  seePerfil(){
    this.router.navigate(['perfil/'+this.idDoctor , {idDoctor : this.idDoctor, 
      token: this.token, 
      nombre: this.nombre }]);
  }

}
