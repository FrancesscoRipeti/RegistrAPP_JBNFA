import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiPresenteProfeService } from '../../service/api-presente-profe.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  username: string = ''; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiPresenteProfeService, 
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || ''; 
    });
  }

  Home() {
    this.router.navigate(['/home']);
  }

  // Función para recuperar la contraseña
  async recuperarPassword() {
    if (this.username.trim() === '') {
      await this.presentAlert('Error', 'Por favor, ingresa tu nombre de usuario o correo.');
      return;
    }


    this.apiService.recuperarPassword(this.username).subscribe({
      next: async () => {
        await this.presentAlert('Éxito', 'Se ha enviado un correo con tu nueva contraseña.');
      },
      error: async () => {
        await this.presentAlert('Error', 'No se ha encontrado el correo. Intenta nuevamente');
      }
    });
  }

  // Función para mostrar una alerta al usuario
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
