import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  constructor( private http: HttpClient) { 
    this.http = http;
  }

  getPatients = (idDoctor : string) : Promise<PatientItf> => {
    let promise = new Promise<PatientItf>((resolve, reject) =>{
      this.http.get('https://randomuser.me/api/?results=6')
      .toPromise()
      .then((response) => {
        resolve(response as PatientItf)
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
