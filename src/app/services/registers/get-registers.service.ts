import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterListItf } from 'src/app/interfaces/registers/register-list-itf';
import { RegisterItf } from 'src/app/interfaces/registers/register-itf';

@Injectable({
  providedIn: 'root'
})
export class GetRegistersService {

  constructor(private http:HttpClient) {
    this.http = http;
  }

  getRegisters = (idPatient: string) : Promise<RegisterItf[]> => {
    let promise = new Promise<RegisterItf[]>((resolve, reject) =>{
      this.http.get('http://localhost:3000/historial/'+ idPatient,{
        headers: {'X-API-TOKEN':'g3n6yYltCrz44dGo7qMwoZK4FlufEBp9'}
      })
      .toPromise()
      .then((response) => {
        resolve(response as RegisterItf[])
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  getRegistersById = (idRegister : string) : Promise<RegisterItf> => {
    var endpoint = 'http://localhost:3000/registro/' + idRegister;
    let promise = new Promise<RegisterItf>((resolve, reject) =>{
      this.http.get(endpoint,{
        headers: {'X-API-TOKEN':'g3n6yYltCrz44dGo7qMwoZK4FlufEBp9'}
      })
      .toPromise()
      .then((response) => {
        resolve(response as RegisterItf)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

}
