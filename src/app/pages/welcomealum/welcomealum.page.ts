import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcomealum',
  templateUrl: './welcomealum.page.html',
  styleUrls: ['./welcomealum.page.scss'],
})
export class WelcomealumPage implements OnInit {
  username: string = ''; // Variable para el username

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || ''; // Captura el username de la URL
    });
  }
  cerrarSesion() {
    if (confirm('¿Desea cerrar sesión?')) {
      localStorage.removeItem('token');  // Elimina el token
      this.router.navigate(['/home']);    // Redirige al usuario a la página de inicio
    }
  }
  redirectScanQR() {
    this.router.navigate(['/scan-qr'], { queryParams: { username: this.username } });
  }
}
