import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterDetailsComponent } from '../register-details/register-details.component';
import { RegisterListItf } from "src/app/interfaces/registers/register-list-itf";
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Patient} from "../../../interfaces/patients/patient";
import {RegisterItf} from "../../../interfaces/registers/register-itf";



@Component({
  selector: 'app-registers-table',
  templateUrl: './registers-table.component.html',
  styleUrls: ['./registers-table.component.css']
})
export class RegistersTableComponent implements OnInit {

  @Input() parentData;

  displayedColumns: string[] = ['position', 'asunto', 'fecha', 'acciones'];
  dataSource: RegisterItf[];
  name: string;

  constructor(public dialog: MatDialog,
    private getRegistersSvc : GetRegistersService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    this.getRegistersSvc.getRegisters(this.parentData.paciente_id).then((response) =>{
      this.dataSource = response;
      console.log(this.dataSource);
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
