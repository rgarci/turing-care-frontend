import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})

export class DoctorFormComponent implements OnInit {

  registerFormTemplate = this.fb.group({
      firstName: ['', Validators.required],
    lastNames: ['', Validators.required],
    clinic: ['', Validators.required],
    clinic_direction:['', Validators.required],
    curp: ['', Validators.required],
    medicalAreas: ['', Validators.required],
    cedula: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DoctorFormComponent>) {
  }

  ngOnInit(): void {
  }

  register() {
    this.dialogRef.close(this.registerFormTemplate.value);
  }
}
