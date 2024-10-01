import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');

    // 2. Clone the request and add the Authorization header if a token exists
    if (token) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    } else {
      // 3. If no token, proceed with the original request
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            // 1. Redirect to the login page
            this.router.navigate(['/login']); 
          }
          return throwError(error); // Re-throw the error for further handling if needed
        })
      );
    }
  }
}
