import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterDetailsComponent } from '../register-details/register-details.component';
import { RegisterListItf } from "src/app/interfaces/registers/register-list-itf";
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Patient} from "../../../interfaces/patients/patient";
import {RegisterItf} from "../../../interfaces/registers/register-itf";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";



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

  updateRegister(registro_id: any) {
    let loadedRegister : RegisterItf;
    this.getRegistersSvc.getRegistersById(registro_id).then((response) =>{
      loadedRegister = response;
      const dialogRef = this.dialog.open(RegisterFormComponent, {
        width:'100%',
        data: {
          title: 'Editar registro',
          idDoctor: this.parentData.doctor_id,
          idPatient : this.parentData.paciente_id,
          registro: {
            idRegister : registro_id,
            fecha_cita: loadedRegister.fecha_cita,
            sintomas: loadedRegister.sintomas,
            asunto: loadedRegister.asunto,
            descripcion: loadedRegister.descripcion,
            medicamento_recetado: loadedRegister.medicamento_recetado,
            observaciones: loadedRegister.observaciones,
            tipo_tratamiento: loadedRegister.tipo_tratamiento,
            seguimiento_tratamiento: loadedRegister.seguimiento_tratamiento

          }
        }
      });


      dialogRef.afterClosed().subscribe(result  => {
        console.log('Dialog result:  %O', result);
        if (result) {
            window.location.reload();
        }
      });

    }, (error) => {
      console.log(error);
      return;
    });
  }
}
