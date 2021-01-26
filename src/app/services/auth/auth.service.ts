import { Injectable } from '@angular/core';
import {User} from "../../classes/user";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DoctorItf} from "../../interfaces/doctors/doctor-itf";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  //to be notified when a user logs in, logs out or updates their profile.
  public user: Observable<User>;

  constructor( private router: Router, private http: HttpClient  ) {
    //uncomment to local storage
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean{
    //TODO: verify the condition to logged in
    if (this.userValue.id===1) {
      // authorised so return true
      return true;
    }
  }

 //TODO: add endpoint to loginconnection
  login = (username: string, password: string): User => {
    // let promise = new Promise<User> ( (resolve, reject) => {
    //     this.http.get('urlDemo' )
    //       .toPromise()
    //       .then((response) => {
    //         resolve(response as User);
    //       }, (error) => {
    //         reject(error);
    //       });
    // }
    let us = new User();
    us.id=6;
    us.username = "wawau";
    this.userSubject.next(us);
    console.log(username+ password);
    return us as User;
    // );
    // return promise;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
