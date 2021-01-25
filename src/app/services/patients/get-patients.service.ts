import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getPatients = (idDoctor : string) : Promise<PacienteList> => {
    let promise = new Promise<PacienteList>((resolve, reject) =>{
      this.http.get('api/pacientes/medico/1', {
        headers: {'Authorization':'d7e76283-caec-458e-b567-2db98319a06e'}
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

  getPatient = (idPatient : string) : Promise<Paciente> => {
    let promise = new Promise<Paciente>((resolve, reject) =>{
      this.http.get('api/paciente/'+idPatient,{
        headers: {'Authorization':'d7e76283-caec-458e-b567-2db98319a06e'}
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

  createPaciente = (paciente : Paciente) : Promise<Paciente> => {
    let promise = new Promise<Paciente>((resolve,reject) =>{
      this.http.post('api/', paciente, {
        headers: {'Authorization':'d7e76283-caec-458e-b567-2db98319a06e'}
      })
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
