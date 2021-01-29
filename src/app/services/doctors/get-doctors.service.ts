import { Injectable } from '@angular/core';
import {DoctorItf} from '../../interfaces/doctors/doctor-itf';
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

  getDoctors = (): Promise<Doctor[]> => {
    let promise = new Promise<Doctor[]> ( (resolve, reject) => {
     this.http.get('https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=hospitales-y-centros-de-salud&q=&rows=9'  )
          .toPromise()
          .then((response) => {
            resolve(response as Doctor[]);
          }, (error) => {
            reject(error);
          });
    });
    return promise;
  }
}
