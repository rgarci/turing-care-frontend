import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterListItf } from 'src/app/interfaces/registers/register-list-itf';
import { RegisterItf } from 'src/app/interfaces/registers/register-itf';
import { RegistrosList } from 'src/app/interfaces/registers/registros-list';
import { Registros } from 'src/app/interfaces/registers/registros';
import { RegistroPost } from 'src/app/interfaces/registers/registroPost';

@Injectable({
  providedIn: 'root'
})
export class GetRegistersService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  getRegisters = () : Promise<RegistrosList> => {
    let promise = new Promise<RegistrosList>((resolve, reject) =>{


      this.http.get('/api/historial_medico/1',{
        headers: {'Authorization':'d7e76283-caec-458e-b567-2db98319a06e'}
      })
      .toPromise()
      .then((response) => {
        console.log(response);
        resolve(response as RegistrosList)
      }, (error) => {
        reject(error);
      })
    })
    return promise;
  }

  getRegistersById = (idRegister : string) : Promise<Registros> => {
    var endpoint = 'api/historial_medico/id/' + idRegister;
    let promise = new Promise<Registros>((resolve, reject) =>{
      this.http.get(endpoint,{
        headers: {'Authorization':'d7e76283-caec-458e-b567-2db98319a06e'}
      })
      .toPromise()
      .then((response) => {
        resolve(response as Registros)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  

  createRegistro = (registro : RegistroPost) : Promise<Registros> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'd7e76283-caec-458e-b567-2db98319a06e'
      })
    };
    let promise = new Promise<Registros>((resolve,reject) =>{
      this.http.post<Registros>('api/registroMedico', registro, httpOptions)
      .toPromise()
      .then((response) => {
        resolve(response as Registros)
      }, (error) => {
        reject(error)
      })
    });
    return promise;
  }

}
