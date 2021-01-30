import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Doctor} from '../../interfaces/doctors/doctor';


@Injectable({
  providedIn: 'root'
})

export class GetDoctorsService {

  cachedValues: Array<{
    [id: number]: Doctor
  }> = [];


  constructor(private http: HttpClient ) {
    this.http = http;
  }

  getDoctorById = (id: number): Promise<Doctor> => {
    let promise = new Promise<Doctor> ( (resolve, reject) => {
      if (this.cachedValues[id]){
        resolve(this.cachedValues[id] as unknown as Doctor);
      }else {
        this.http.get('http://localhost:3000/doctor/' + id)
          .toPromise()
          .then((response) => {
            resolve(response as Doctor);
          }, (error) => {
            reject(error);
          });
      }
    });
    return promise;
  }

  getInfoDoctorById = (id): Promise<Doctor> => {
    let promise = new Promise<Doctor> ( (resolve, reject) => {
        this.http.get('http://localhost:3000/info/doctor/' + id )
          .toPromise()
          .then((response) => {
            resolve(response as Doctor);
          }, (error) => {
            reject(error);
          });
    });
    return promise;
  }

  getDoctors = (): Promise<Doctor[]> => {
    let promise = new Promise<Doctor[]> ( (resolve, reject) => {
     this.http.get('http://localhost:3000/doctor/'  )
          .toPromise()
          .then((response) => {
            resolve(response as Doctor[]);
          }, (error) => {
            reject(error);
          });
    });
    return promise;
  }

  createDoctor = (doctor: Doctor): Promise<Doctor> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let promise = new Promise<Doctor>((resolve, reject) => {
      this.http.post('http://localhost:3000/doctor/', doctor, httpOptions)
        .toPromise()
        .then((response) => {
          resolve(response as Doctor);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }

  updateDoctor= (doctor: Doctor): Promise<Doctor> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let promise = new Promise<Doctor>((resolve, reject) => {
      this.http.put('http://localhost:3000/doctor/', doctor, httpOptions)
        .toPromise()
        .then((response) => {
          console.log(response);
          resolve(response as Doctor);
        }, (error) => {
          reject(error);
        });
    });
    return promise;
  }
}
