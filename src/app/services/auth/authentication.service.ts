import { Injectable } from '@angular/core';
import {catchError, first, map, shareReplay, tap} from 'rxjs/operators';
import {User} from '../../classes/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  // to be notified when a user logs in, logs out or updates their profile.
  public currentUser: Observable<User>;

  constructor( private router: Router, private http: HttpClient ) {
    // uncomment to local storage
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



  login = (username: string, password: string): Observable<User> => {
    const url = 'http://localhost:3000/login';
    return this.http.post(url , { username, password})
       .pipe(
         map(user => {
           let us = user as User;
         // store user details and jwt token in local storage to keep user logged in between page refreshes
           us.role = this.getDecodedAccessToken(us.token).role;
           localStorage.setItem('currentUser', JSON.stringify( us));
           this.currentUserSubject.next(us);
           return us ;
       }),
         shareReplay(1));
  }

  logout = () => {
    this.removeUser();
    this.router.navigate(['/login']);
  }

  // remove user and credentiasls from local storage and set current user to null
  removeUser = () => {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    return this.http.post<any>('http://localhost:3000/token', {
      refreshToken: this.getRefreshToken(),
      username: this.currentUserValue.username
    }).pipe(tap((response) => {
       const updateUser = this.currentUserValue;
       updateUser.token = response.token;
       updateUser.role = this.currentUserValue.role;
       localStorage.setItem('currentUser', JSON.stringify(updateUser));
       this.currentUserSubject.next(updateUser as User);
    }));
  }

  private getRefreshToken() {
    return this.currentUserValue.refreshToken;
  }

  getRole(): string{
    return this.currentUserValue.role;
  }

  private getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch (Error){
      return null;
    }
  }
}
