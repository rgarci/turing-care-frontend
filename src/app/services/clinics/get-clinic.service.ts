import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Clinic} from "../../interfaces/clinics/clinic";

@Injectable({
  providedIn: 'root'
})
export class GetClinicService {


  constructor(private http: HttpClient ) {
    this.http = http;
  }

  getClinicById = (id: number): Promise<Clinic> => {
    let promise = new Promise<Clinic> ( (resolve, reject) => {
      this.http.get('http://localhost:3000/clinica/' + id )
        .toPromise()
        .then((response) => {
          resolve(response as Clinic);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }

  getClinicList = (): Promise<Clinic[]> => {
    let promise = new Promise<Clinic[]> ( (resolve, reject) => {
      this.http.get('http://localhost:3000/clinica')
        .toPromise()
        .then((response) => {
          resolve(response as Clinic[]);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }

  getClinicByName = (name: string): Promise<Clinic> => {
    let promise = new Promise<Clinic> ( (resolve, reject) => {
      this.http.get('http://localhost:3000/clinica?name=' + name )
        .toPromise()
        .then((response) => {
          resolve(response as Clinic);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }
}
