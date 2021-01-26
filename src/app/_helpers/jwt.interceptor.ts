import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // authenticationService
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      // Clone the request and set the new header in one step.
      request = request.clone({ setHeaders: { Authorization: 'Bearer ' + currentUser.token} });
    }
// send cloned request with header to the next handler.
    return next.handle(request);
  }
}
