import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  username: string = ''; // Variable para el username

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Suscribirse a los parámetros de la URL para obtener el username
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || ''; // Captura el username de la URL
    });
  }

   cerrarSesion() { 
    if (confirm('¿Desea cerrar sesión?')) {
      this.router.navigate(['/home']);
    }
  }
}
