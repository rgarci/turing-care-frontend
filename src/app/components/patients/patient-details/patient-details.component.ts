import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';
import { RegisterFormComponent } from '../../registers/register-form/register-form.component';
import {Patient} from '../../../interfaces/patients/patient';
import {AlertBars} from "../../../_helpers/alert-bars";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient : Patient;
  idPatient : string;
  idDoctor : string;

  constructor(private getPatientsSvc : GetPatientsService, private route : ActivatedRoute, private router : Router,
    public dialog:MatDialog, private alertBars : AlertBars) { }

  ngOnInit(): void {

    this.idPatient = this.route.snapshot.paramMap.get('idPatient');
    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    this.getPatientsSvc.getPatient(this.idPatient).then((response) =>{
      this.patient = response;
    }, (error) => {
      this.alertBars.openErrorSnackBar();
    })
  }

  openCreateFormRegister(){
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width:'100%',
      data: {
        title: 'Añadir registro',
        idDoctor : this.idDoctor,
        idPatient : this.idPatient
      }
    });
  }
}
