import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientItf } from 'src/app/interfaces/patients/patient-itf';
import { Paciente } from 'src/app/interfaces/patients/paciente';
import { PacienteList } from 'src/app/interfaces/patients/pacienteList';

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  constructor( private http: HttpClient) { 
    this.http = http;
  }

  getPatients = (idDoctor : string, token : string) : Promise<PacienteList> => {
    console.log(token)
    let promise = new Promise<PacienteList>((resolve, reject) =>{
      this.http.get('api/pacientes/medico/'+idDoctor, {
        headers: {'Authorization':token}
      })
      .toPromise()
      .then((response) => {
        resolve(response as PacienteList)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  getPatient = (idPatient : string, token : string) : Promise<Paciente> => {
    let promise = new Promise<Paciente>((resolve, reject) =>{
      this.http.get('api/paciente/'+idPatient,{
        headers: {'Authorization':token}
      })
      .toPromise()
      .then((response) => {
        resolve(response as Paciente)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  createPaciente = (paciente : Paciente, token : string) : Promise<Paciente> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    let promise = new Promise<Paciente>((resolve,reject) =>{
      this.http.post('api/paciente', paciente, httpOptions)
      .toPromise()
      .then((response) => {
        resolve(response as Paciente)
      }, (error) => {
        reject(error)
      })
    });
    return promise;
  }

}
