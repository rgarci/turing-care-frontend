import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

 constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
       if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else if (err.status === 401) {
            console.log("Error 401 recibido de la siquiente request");
            console.log(request);
            return  next.handle(request);
          // //auto logout if 401 response returned from no valid token or refreshed token.
          // this.authenticationService.logout();
          // console.log('loggin out');
         // location.reload();
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(`Backend returned code ${err.status}, ` +
            `body was: ${err.error}`);
        }
       console.log("Error interceptado");
      console.log(err);
      // Return an observable with a user-facing error message.
      const error = err.message || err.statusText;
      return throwError(error);
    }));
  }




}

