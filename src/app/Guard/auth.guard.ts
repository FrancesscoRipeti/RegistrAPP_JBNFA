import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiPresenteProfeService } from '../service/api-presente-profe.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private apiService : ApiPresenteProfeService
  ) {}

  canActivate(): boolean {
    if (this.apiService.isAuthenticated()) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/home']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
