import { Component, Inject, OnInit } from '@angular/core';
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterItf } from "src/app/interfaces/registers/register-itf";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  exportAsPDF(divId)
    {
        let data = document.getElementById('divId');  
        html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
        pdf.output("blob");  
      }); 
    }
}
