import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import {Patient} from "../../interfaces/patients/patient";

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  url = 'http://localhost:3000/paciente/';

  constructor( private http: HttpClient) {
    this.http = http;
  }

  //TODO: PatientITF - Change promise tipe to match backend response as patient[];
  getPatients = (idDoctor : string) : Promise<Patient[]> => {
    let promise = new Promise<Patient[]>((resolve, reject) =>{
      let route = 'http://localhost:3000/doctor/' + idDoctor + '/pacientes';
      console.log(route);
      this.http.get(route)
      .toPromise()
      .then((response) => {
        resolve(response as Patient[]);
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  getPatient = (idPatient : string) : Promise<Patient> => {
    let promise = new Promise<Patient>((resolve, reject) =>{
      console.log(this.url + idPatient);
      this.http.get(this.url + idPatient)
      .toPromise()
      .then((response) => {
        resolve(response as Patient);
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  createPatient= (paciente : Patient) : Promise<Patient> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let promise = new Promise<Patient>((resolve,reject) =>{
           this.http.post(this.url, paciente, httpOptions)
        .toPromise()
        .then((response) => {
          resolve(response as Patient);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }

  updatePatient = (paciente : Patient): Promise<Patient> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let promise = new Promise<Patient>((resolve,reject) =>{
      this.http.put(this.url, paciente, httpOptions)
        .toPromise()
        .then((response) => {
          resolve(response as Patient);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }
}
