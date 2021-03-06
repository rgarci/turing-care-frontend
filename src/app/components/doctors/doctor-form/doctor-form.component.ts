import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Doctor} from '../../../interfaces/doctors/doctor';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';
import {Clinic} from '../../../interfaces/clinics/clinic';
import {GetClinicService} from '../../../services/clinics/get-clinic.service';
import {AlertBars} from "../../../_helpers/alert-bars";

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})

export class DoctorFormComponent implements OnInit {

  frmReactivo = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    clinic: ['', Validators.required],
    clinic_direction: ['', Validators.required],
    curp: ['', Validators.required],
    medicalAreas: ['', Validators.required],
    cedula: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    photoName: [{value: '', disabled: true},
      [ Validators.pattern('([0-9a-zA-Z\\._-]+.(png|PNG||jp[e]?g|JP[E]?G))')]],
    photo: ['']
  });

  loading = false;
  idDoctor: number;
  idUser: number;
  selectedFile: File;
  base64file: string;
  clinicas: Clinic[];
  selectedClinic: Clinic;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DoctorFormComponent>, @Inject(MAT_DIALOG_DATA) public data,
              private srvDoctor: GetDoctorsService, private clinicaSrv: GetClinicService,
              private alertBars: AlertBars) {
    this.idUser = null;
    this.clinicas = null;
    this.selectedClinic = null;
    if (data.doctor){ // on update
      this.idDoctor = data.doctor.doctor_id;
      this.frmReactivo.controls.firstName.setValue(data.doctor.nombre);
      this.frmReactivo.controls.lastName.setValue(data.doctor.apellido_paterno);
      this.frmReactivo.controls.secondLastName.setValue(data.doctor.apellido_materno);

      this.frmReactivo.controls.clinic.setValue(data.doctor.nombre_clinica);
      this.frmReactivo.controls.clinic_direction.setValue(data.doctor.direccion_clinica);
      this.frmReactivo.controls.clinic.disable();
      this.frmReactivo.controls.clinic_direction.disable();

      this.frmReactivo.controls.email.setValue(data.doctor.email);
      this.frmReactivo.controls.phone.setValue(data.doctor.telefono);
      this.frmReactivo.controls.curp.setValue(data.doctor.curp);
      this.frmReactivo.controls.medicalAreas.setValue(data.doctor.especialidad);
      this.frmReactivo.controls.cedula.setValue(data.doctor.cedula);
    }
    if (data.create){
      this.frmReactivo.controls.clinic_direction.disable();
      this.getClinicas();
    }
  }

  ngOnInit(): void {
  }

  register() {
    if (this.data.send_email){
      const doctor = {
        nombre: this.frmReactivo.get('firstName').value,
        apellido_paterno: this.frmReactivo.get('lastName').value,
        apellido_materno: this.frmReactivo.get('secondLastName').value,
        curp: this.frmReactivo.get('curp').value,
        url_cedula: this.frmReactivo.get('cedula').value,
        url_foto: this.base64file,
        especialidad: this.frmReactivo.get('medicalAreas').value,
        email: this.frmReactivo.get('email').value,
        telefono: this.frmReactivo.get('phone').value,
        clinica: this.frmReactivo.get('clinic').value,
        direccion_clinica: this.frmReactivo.get('clinic_direction').value
      };
      console.log(doctor);
      this.srvDoctor.sendEmail(doctor)
        .then((response) => {

          let alertRef = this.alertBars.openSendingSnackBar('Corrreo Enviado','Ver');
          alertRef.onAction().subscribe(() => {
            let actionUrl = response.messageUrl;
              window.open(actionUrl);
            alertRef.dismiss();
          });

        }, (error) => {
          console.log('Error: ' + error.statusText );
          this.alertBars.openErrorSnackBar('Error enviando');
        });
      this.dialogRef.close(doctor);

    } else {
      let idClinica = null;
      let status = null;

      if (this.data.idUser){
        this.idUser = this.data.idUser;
      }
      // on update.
      if (this.data.doctor){
        idClinica = this.data.doctor.idClinica;
        status = this.data.doctor.status;
      } else if (this.data.create){ // on create
        idClinica = this.selectedClinic.clinica_id;
      }

      const doctor: Doctor = {
        doctor_id: this.idDoctor,
        clinica_id: idClinica,
        nombre: this.frmReactivo.get('firstName').value,
        apellido_paterno: this.frmReactivo.get('lastName').value,
        apellido_materno: this.frmReactivo.get('secondLastName').value,
        curp: this.frmReactivo.get('curp').value,
        url_cedula: this.frmReactivo.get('cedula').value,
        url_foto: this.base64file,
        especialidad: this.frmReactivo.get('medicalAreas').value,
        status,
        email: this.frmReactivo.get('email').value,
        telefono: this.frmReactivo.get('phone').value,
        user_id: this.idUser
      };

      if (this.data.doctor) { // se actualiza
        this.srvDoctor.updateDoctor(doctor).then(r =>
        {
          this.loading= false;
          this.dialogRef.close();
          let alrt = this.alertBars.openSuccessSnackBar('Doctor actualizado');
          alrt.afterDismissed().subscribe(info => {
            window.location.reload();
          });
        }, (error) => {
          this.loading= false;
          this.dialogRef.close();
          let alrt = this.alertBars.openErrorSnackBar();
        });
      }else {
        this.srvDoctor.createDoctor(doctor).then(r =>
        {

          this.loading= false;
          this.dialogRef.close();
          let alrt = this.alertBars.openSuccessSnackBar('Doctor creado');
          alrt.afterDismissed().subscribe(info => {
            window.location.reload();
          });
        }, (error) => {

          this.loading= false;
          this.dialogRef.close();
          let alrt = this.alertBars.openErrorSnackBar();
        });
      }// se crea
      this.dialogRef.disableClose = true;

      this.loading = true;
    }
  }

  selectFile(event) {
    this.selectedFile = event.target.files.item(0);
    console.log(this.selectedFile);
    this.file2Base64(this.selectedFile).then((response) => {
      this.base64file = response;
    });
  }

  file2Base64 = (file: File): Promise<string> => {
    return new Promise<string> ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  }
  getClinicas = () => {
    this.clinicaSrv.getClinicList()
      .then((response) => {
        this.clinicas = response;
      }, (error) => {
        console.log('Error: ' + error.statusText );
      });
  }
}
