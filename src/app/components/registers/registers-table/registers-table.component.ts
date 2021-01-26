import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterDetailsComponent } from '../register-details/register-details.component';
import { RegisterListItf } from "src/app/interfaces/registers/register-list-itf";
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrosList } from 'src/app/interfaces/registers/registros-list';



@Component({
  selector: 'app-registers-table',
  templateUrl: './registers-table.component.html',
  styleUrls: ['./registers-table.component.css']
})
export class RegistersTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'asunto', 'fecha', 'acciones'];
  dataSource:RegistrosList;
  name: string;

  @Input("idPatient") idPciente : number;
  @Input("token") token : string;

  constructor(public dialog: MatDialog, 
    private getRegistersSvc : GetRegistersService, private route : ActivatedRoute, private router : Router) {}


  ngOnInit(): void {
    this.getRegistersSvc.getRegisters(this.idPciente, this.token).then((response) =>{
      console.log(response);
      this.dataSource= response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  openDialog(idRegister) {
    const dialogRef = this.dialog.open(RegisterDetailsComponent,  {
      width:'100%',
      data: {idRegister: idRegister, token:this.token}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}
