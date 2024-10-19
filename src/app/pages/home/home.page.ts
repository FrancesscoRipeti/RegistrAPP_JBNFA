import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiPresenteProfeService } from '../../service/api-presente-profe.service';  // Ajusta el camino si es necesario


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ ApiPresenteProfeService]

})
export class HomePage {
  username: string = '';
  password: string = '';
  menuType: string = 'overlay';

  // diccionario de usuarios y contraseñas para usar
  //user nombre de la variable le decimos que sera un nuevo map
  users = new Map<string, string>([
    ['Juan', 'admin123'],
    ['Belen', 'admin123'],
    ['Pepito', 'password1'],
    ['Feña', 'password2']
  ]);
  roles = new Map<string, string>([
    ['Juan', 'profesor'],
    ['Belen', 'profesor'],
    ['Pepito', 'regular'],
    ['Feña', 'regular']
  ]);


  constructor(
    private ApiPresenteProfeService: ApiPresenteProfeService,
    private alertController: AlertController,
    private router: Router,
    ) {}

  // Método para mostrar alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  data: any;

  // Función para login con mensajes de depuración
  async login():Promise<void> {

    // lo ocupamos para limpiar los inputs
    const cleanUsername = this.username.trim();
    const cleanPassword = this.password.trim();


    this.ApiPresenteProfeService.getToken({ correo: cleanUsername, password: cleanPassword }).subscribe(
      (token) => {
        this.handleLogin(token, cleanUsername);
      },
      (error) => {
        console.error('Error al obtener el token:', error);
        this.presentAlert('Error al iniciar session.');
      }
    );

/*
    // Imprimir los valores para verificar qué se está obteniendo
    //esto lo pueden ver con el f12 en la consola del navegador
    console.log('usuario ingresado:', cleanUsername);
    console.log('contraseña ingresada:', cleanPassword);
    console.log('contraseña esperada:', validadorPass);

    // Verificación del login
    if (validadorPass && validadorPass === cleanPassword) {
      console.log('Usuario válido');
      if (userRole === 'profesor') {
        this.router.navigate(['/welcome'], { queryParams: { username: this.username } });
          // Ruta para administradores
      }
      if (userRole === 'regular') {
        this.router.navigate(['/welcomealum'], { queryParams: { username: this.username } });
      }
    } else {
      await this.presentAlert('Usuario o contraseña incorrectos.');
      console.log('Usuario inválido');
    } */
  }

  handleLogin(token: any, cleanUsername: string): void {
    const perfil = token.perfil;
    console.log('perfil:', perfil);
  
    if (token && token.data && token.auth && token.auth.token) {
      console.log('Usuario válido');
      // Guardar el token 
      localStorage.setItem('token', token.auth.token); 
  
      if (perfil === 'docente') {
        this.router.navigate(['/welcome'], { queryParams: { username: cleanUsername } });
      } else if (perfil === 'estudiante') {
        this.router.navigate(['/welcomealum'], { queryParams: { username: cleanUsername } });
      }
    } else {
      this.presentAlert('Usuario o contraseña incorrectos.');
      console.log('Usuario inválido');
    }
  }
  

  recoveryPassword() {
    // metodo para recuperar la del username en realidad para ocuparlo en recuperar contraseña
    this.router.navigate(['/recuperar'],
      { queryParams: { username: this.username } });
  }




/*

aqui les dejo algunos metodos que se pueden ocupar en el map
que encontre en los fotos

para crear un nuevo Map
const users = new Map<string, string>();

para añadir pares clave-valor (usuario-contraseña)
users.set('admin', 'admin123');
users.set('user1', 'password1');
users.set('user2', 'password2');

para obtener el valor asociado a una clave
const password = users.get('admin'); // 'admin123'

para poder verificar si una clave existe
const hasUser1 = users.has('user1'); // true

para poder eliminar una clave
users.delete('user2');

para limpiar todos los pares clave-valor
users.clear();

*/

  }
