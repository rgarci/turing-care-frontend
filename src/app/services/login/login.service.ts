import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
