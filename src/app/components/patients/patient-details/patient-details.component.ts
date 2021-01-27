import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import { GetPatientsService } from 'src/app/services/patients/get-patients.service';
import { RegisterFormComponent } from '../../registers/register-form/register-form.component';
import {Patient} from '../../../interfaces/patients/patient';

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
    public dialog:MatDialog) { }

  ngOnInit(): void {

    this.idPatient = this.route.snapshot.paramMap.get('idPatient');
    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    console.log("My input: " + this.idDoctor);
    console.log("patient: " + this.idPatient);

    this.getPatientsSvc.getPatient(this.idPatient).then((response) =>{
      this.patient = response;
    }, (error) => {
      alert("Error: " + error.statusText);
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

    dialogRef.afterClosed().subscribe(result  => {
      console.log('Dialog result:  %O', result);
      if (result) {
        this.refresh(result.paciente_id);
      }
    });

  }

  private refresh(idPatient: string) {
    window.location.reload();
  }
}
