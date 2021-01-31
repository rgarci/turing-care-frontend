import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterDetailsComponent } from '../register-details/register-details.component';
import { GetRegistersService } from 'src/app/services/registers/get-registers.service';
import { ActivatedRoute, Router } from '@angular/router';
import {RegisterItf} from "../../../interfaces/registers/register-itf";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {QuestionDialogComponent} from "../../dialogs/question-dialog/question-dialog.component";
import {AlertBars} from "../../../_helpers/alert-bars";



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
   loading = false;

  constructor(public dialog: MatDialog,
    private getRegistersSvc : GetRegistersService, private route : ActivatedRoute, private router : Router,
              private  alertBars: AlertBars) {}

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

  deleteRegister(registro_id: number) {
    const dialogRef = this.dialog.open(QuestionDialogComponent,{
      data : 'registro'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loading= true;
        this.getRegistersSvc.deleteRegister(registro_id).then(r =>
        {
          this.loading= false;
          let alrt = this.alertBars.openSuccessSnackBar('Registro eliminado');
          alrt.afterDismissed().subscribe(info => {
            window.location.reload();
          });
        }, (error) => {
          this.loading= false;
          let alrt = this.alertBars.openErrorSnackBar('Error eliminando');
        });
        this.alertBars.openSendingSnackBar('Eliminando...');
      }

    });
  }
}
