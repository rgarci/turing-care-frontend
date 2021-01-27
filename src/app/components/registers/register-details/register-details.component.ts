import { Component, Inject, OnInit } from '@angular/core';
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterItf } from "src/app/interfaces/registers/register-itf";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.css']
})
export class RegisterDetailsComponent  implements OnInit  {
  idRegister: string
  dataSource: RegisterItf;

  constructor(
    private getRegistersSvc : GetRegistersService, private route : ActivatedRoute, private router : Router,
    public dialogRef: MatDialogRef<RegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.idRegister = data;
    }

  ngOnInit(): void {
    this.getRegistersSvc.getRegistersById(this.idRegister).then((response) =>{
      this.dataSource = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })

  }
}
