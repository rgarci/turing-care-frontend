import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Doctor} from '../../../interfaces/doctors/doctor';
import {GetDoctorsService} from '../../../services/doctors/get-doctors.service';

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

  idDoctor: number;
  idUser: number;
  selectedFile: File;
  base64file: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DoctorFormComponent>, @Inject(MAT_DIALOG_DATA) public data,
              private srvDoctor: GetDoctorsService) {
    this.idUser = null;
    if (data.doctor){
      this.idDoctor = data.doctor.doctor_id;
      this.frmReactivo.controls.firstName.setValue(data.doctor.nombre);
      this.frmReactivo.controls.lastName.setValue(data.doctor.apellido_paterno);
      this.frmReactivo.controls.secondLastName.setValue(data.doctor.apellido_materno);
      this.frmReactivo.controls.clinic.setValue(data.doctor.nombre_clinica);
      this.frmReactivo.controls.clinic_direction.setValue(data.doctor.direccion_clinica);
      this.frmReactivo.controls.email.setValue(data.doctor.email);
      this.frmReactivo.controls.phone.setValue(data.doctor.telefono);
      this.frmReactivo.controls.curp.setValue(data.doctor.curp);
      this.frmReactivo.controls.medicalAreas.setValue(data.doctor.especialidad);
      this.frmReactivo.controls.cedula.setValue(data.doctor.cedula);
    }
  }

  ngOnInit(): void {
  }

  register() {

    if(this.data.send_email){
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
      };
      console.log(doctor);
      this.dialogRef.close(doctor);
      //TODO: send email to doctar;
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
      } else { // on create
        idClinica = this.getClinica(this.frmReactivo.get('clinic').value);
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
          this.dialogRef.close(r);
        });
      }else {
        this.srvDoctor.createDoctor(doctor).then(r =>
        {
          this.dialogRef.close(r);
        });
      }// se crea
    }
  }

  selectFile(event) {
    this.selectedFile = event.target.files.item(0);
    console.log(this.selectedFile);
    this.file2Base64(this.selectedFile).then((response)=> {
      this.base64file = response;
    });
  }

  file2Base64 = (file:File):Promise<string> => {
    return new Promise<string> ((resolve,reject)=> {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  }
  getClinica(nombre: string): number{

    // TODO: BUSCAR el id de la clinica y ponerlo;
    return 1;
  }
}
