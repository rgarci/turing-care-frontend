import { Component, OnInit } from '@angular/core';
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

  constructor(public dialog: MatDialog, 
    private getRegistersSvc : GetRegistersService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    this.getRegistersSvc.getRegisters().then((response) =>{
      console.log(response);
      this.dataSource= response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(RegisterDetailsComponent,  {
      width:'100%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}
