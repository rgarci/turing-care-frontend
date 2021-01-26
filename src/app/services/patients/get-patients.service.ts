import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import {Patient} from "../../interfaces/patients/patient";

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  constructor( private http: HttpClient) {
    this.http = http;
  }

  //Change promise tipe to match backend response as patient[];
  getPatients = (idDoctor : string) : Promise<Patient[]> => {
    let promise = new Promise<Patient[]>((resolve, reject) =>{
      let url = 'http://localhost:3000/doctor/' + idDoctor + '/pacientes';
      console.log(url);
      this.http.get(url)
      .toPromise()
      .then((response) => {
        resolve(response as Patient[]);
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  getPatient = (idPatient : string) : Promise<PatientItf> => {
    let promise = new Promise<PatientItf>((resolve, reject) =>{
      this.http.get('https://randomuser.me/api/')
      .toPromise()
      .then((response) => {
        resolve(response as PatientItf)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }
}
