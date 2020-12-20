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

  getRegisters = () : Promise<RegisterListItf> => {
    let promise = new Promise<RegisterListItf>((resolve, reject) =>{
      this.http.get('https://sofisis.com/api/v1/history_clinic/diagnostic/',{
        headers: {'X-API-TOKEN':'g3n6yYltCrz44dGo7qMwoZK4FlufEBp9'}
      })
      .toPromise()
      .then((response) => {
        resolve(response as RegisterListItf)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }

  getRegistersById = (idRegister : string) : Promise<RegisterItf> => {
    var endpoint = 'https://sofisis.com/api/v1/history_clinic/diagnostic/' + idRegister +'/';
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
