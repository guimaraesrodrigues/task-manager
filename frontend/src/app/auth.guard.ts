import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 1. Check if a JWT token exists in localStorage (or wherever you store it)
    const token = localStorage.getItem('token');

    if (token) {
      // 2. (Optional) You can verify the token's validity here if needed
      //    (e.g., check expiration date, decode the payload)

      return true; // Allow access to the route
    } else {
      // 3. Redirect to the login page if no token is found
      return this.router.parseUrl('/login'); // Redirect to login
    }
  }
}
