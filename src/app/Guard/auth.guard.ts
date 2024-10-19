import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay token, permite el acceso
      return true;
    } else {
      // Si no hay token, redirige al login o página de inicio
      this.router.navigate(['/home']);
      return false;
    }
  }
}
