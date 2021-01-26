import { Injectable } from '@angular/core';
import {User} from "../../classes/user";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DoctorItf} from "../../interfaces/doctors/doctor-itf";
import {catchError, first, map} from "rxjs/operators";
import {ErrorInterceptor} from "../../_helpers/http-interceptors/error-interceptor.interceptor";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  //to be notified when a user logs in, logs out or updates their profile.
  public currentUser: Observable<User>;

  constructor( private router: Router, private http: HttpClient ) {
    //uncomment to local storage
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login = (username: string, password: string): Observable<User> => {
    let url = 'http://localhost:3000/usuarios/autenticar';
    return this.http.post(url ,{ usuario: username, psswd: password})
       .pipe(
         map(user => {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify( user));
         this.currentUserSubject.next(user as User);
         console.log(this.currentUserValue);
         return user as User;
       }));
  }

  logout = () => {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
