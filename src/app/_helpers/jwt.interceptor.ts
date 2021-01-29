import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/auth/authentication.service';
import {filter, switchMap, take} from "rxjs/operators";
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  //TO queue all request, since they have to come here first
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // authenticationService
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      // Clone the request and set the new header in one step.
      const authReq = this.addToken(request, currentUser.token);
      return next.handle(authReq).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
    }
// send cloned request with header to the next handler.
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      console.log('Refresing token');

      return this.authenticationService.refreshToken().pipe(
        switchMap((refresResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(refresResponse.token);
          return next.handle(this.addToken(request, refresResponse.token));
        }));

    } else {
      console.log("waiting to refresh");
      return this.refreshTokenSubject.pipe(
        filter(refresResponse => refresResponse != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token.token));
        }));
    }
  }
}
