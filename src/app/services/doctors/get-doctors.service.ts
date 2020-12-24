import { Injectable } from '@angular/core';
import {DoctorItf} from '../../interfaces/doctors/doctor-itf';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GetDoctorsService {

  cachedValues: Array<{
    [id: string]: DoctorItf
  }> = [];


  constructor(private http: HttpClient ) {
    this.http = http;
  }

  getDoctorById = (id: string): Promise<DoctorItf> => {
    let promise = new Promise<DoctorItf> ( (resolve, reject) => {
      if (this.cachedValues[id]){
        resolve(this.cachedValues[id]);
      }else {
        this.http.get('https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=hospitales-y-centros-de-salud&q=&rows=1' )
          .toPromise()
          .then((response) => {
            resolve(response as DoctorItf);
          }, (error) => {
            reject(error);
          });
      }
    });
    return promise;
  }

  getDoctors = (limit: number): Promise<DoctorItf> => {
    let promise = new Promise<DoctorItf> ( (resolve, reject) => {
      if (this.cachedValues[limit]){
        resolve();
      }else {
        this.http.get('https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=hospitales-y-centros-de-salud&q=&rows=' + limit )
          .toPromise()
          .then((response) => {
            resolve(response as DoctorItf);
          }, (error) => {
            reject(error);
          });
      }
    });
    return promise;
  }
}
