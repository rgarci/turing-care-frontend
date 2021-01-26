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

  getRegisters = (id : number, token : string) : Promise<RegistrosList> => {
    let promise = new Promise<RegistrosList>((resolve, reject) =>{


      this.http.get('/api/historial_medico/'+id,{
        headers: {'Authorization' : token}
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

  getRegistersById = (idRegister : string, token : string) : Promise<Registros> => {
    var endpoint = 'api/historial_medico/id/' + idRegister;
    let promise = new Promise<Registros>((resolve, reject) =>{
      this.http.get(endpoint,{
        headers: {'Authorization':token}
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

  deleteRegister = (idRegister : string, token : string) : Promise<Registros> => {
    var endpoint = 'api/registroMedico/' + idRegister;
    let promise = new Promise<Registros>((resolve, reject) =>{
      this.http.delete(endpoint,{
        headers: {'Authorization':token}
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

  createRegistro = (registro : RegistroPost, token) : Promise<Registros> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
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
