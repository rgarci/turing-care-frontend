import { Component, Input, OnInit } from '@angular/core';
import {Patient} from "../../../interfaces/patients/patient";
import {PatientFormComponent} from "../patient-form/patient-form.component";
import {MatDialog} from "@angular/material/dialog";
import {QuestionDialogComponent} from "../../dialogs/question-dialog/question-dialog.component";
import {GetPatientsService} from "../../../services/patients/get-patients.service";
import {AlertBars} from "../../../_helpers/alert-bars";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-data-card',
  templateUrl: './patient-data-card.component.html',
  styleUrls: ['./patient-data-card.component.css']
})
export class PatientDataCardComponent implements OnInit{

  @Input() parentData;
  @Input("patients") patients: Patient;
  loading = false;

  constructor(public dialog: MatDialog, private patientSrv: GetPatientsService,
              private  alertBars: AlertBars,private router: Router) {
  }
  ngOnInit(): void {
  }

  editPatient() {
    this.openCreateForm();
  }
  openCreateForm() {
    const dialogRef = this.dialog.open(PatientFormComponent,  {
      width:'100%',
      data: {
        title: 'Editar paciente',
        idDoctor: this.patients.doctor_id,
        paciente: {
          paciente_id: this.patients.paciente_id,
          nombre: this.patients.nombre,
          apellido_paterno: this.patients.apellido_paterno,
          apellido_materno: this.patients.apellido_materno,
          email: this.patients.email,
          telefono: this.patients.telefono,
          fecha_nacimiento: this.patients.fecha_nacimiento,
          sexo: this.patients.sexo,
          alergias: this.patients.alergias,
          operaciones_previas: this.patients.operaciones_previas,
          enfermedades_cronicas: this.patients.enfermedades_cronicas,
          tratamientos_vigentes: this.patients.tratamientos_vigentes,
        }
      }
    });

    dialogRef.afterClosed().subscribe((result)  => {
      console.log('Dialog result:  %O', result);
      if(result) {
        window.location.reload();
      };
    });
  }

  deletePatient(id: number) {
    const dialogRef = this.dialog.open(QuestionDialogComponent,{
      data : 'paciente'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loading= true;
        this.patientSrv.deletePatient(id).then(r =>
        {
          this.loading= false;
          let alrt = this.alertBars.openSuccessSnackBar('Paciente eliminado');
          alrt.afterDismissed().subscribe(info => {
            this.router.navigate(['/patients',
              {idDoctor: this.patients.doctor_id}]);
          });
        }, (error) => {
          this.loading = false;
          let alrt = this.alertBars.openErrorSnackBar('Error eliminando');
        });
        this.alertBars.openSendingSnackBar('Eliminando...');
      }

    });
  }
}
