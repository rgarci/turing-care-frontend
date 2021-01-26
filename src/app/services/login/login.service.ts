import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/interfaces/doctors/doctor';
import { User } from 'src/app/interfaces/doctors/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  login = (body) : Promise<User> =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let promise = new Promise<User>((resolve, reject) =>{
      this.http.post('/api/login',body)
      .toPromise()
      .then((response) => {
        console.log(response);
        resolve(response as User)
      }, (error) => {
        reject(error);
      })
    })
    return promise;
  }

  registerUser = (body) : Promise<User> =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
      let promise = new Promise<User>((resolve,reject) =>{
        this.http.post('api/registrar', body, httpOptions)
        .toPromise()
        .then((response) => {
          resolve(response as User)
        }, (error) => {
          reject(error)
        })
      });
      return promise;
  };

  registerDoctor = (body:Doctor, token: string) : Promise<Doctor> =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
      let promise = new Promise<Doctor>((resolve,reject) =>{
        this.http.post('api/medico', body, httpOptions)
        .toPromise()
        .then((response) => {
          resolve(response as Doctor)
        }, (error) => {
          reject(error)
        })
      });
      return promise;
  };

  exit = (token: string) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
    
      let promise = new Promise((resolve,reject) =>{
        this.http.get('api/exit', httpOptions)
        .toPromise()
        .then((response) => {
          console.log(response);
          console.log(token);

          resolve(response)
        }, (error) => {
          reject(error)
        })
      });
  }
  

}
