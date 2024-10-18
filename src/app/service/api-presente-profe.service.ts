import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiPresenteProfeService {
  private tokenKey = 'authToken';
  private apiUrl = 'https://www.presenteprofe.cl/api';

  constructor(private http: HttpClient) {}

  getToken(params: Params): Observable<any> {
    const urlAuth = this.apiUrl + '/v1/auth';
    const tokenObservable = this.http.post<Token>(urlAuth, params);
    tokenObservable.subscribe(token => {
      this.setTokenLocalStorage(token.auth.token);
    });
    return tokenObservable;
  }

  // Función para almacenar el token después de loguear
  setTokenLocalStorage(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Función para obtener el token desde el almacenamiento local
  getTokenLocalStorage(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getTokenLocalStorage();

    // Si existe un token, verificamos si es válido (puedes agregar más lógica si es necesario)
    return token !== null && token !== '';
  }

 /*
 //TODO service asistence
 CheckAsisttence(Codiog){
    const url = this.apiUrl + '/v1/asistencia/' + Codiog;
    return this.http.post(url);
  } */

}
interface Params {
  correo: string;
  password: string;
}

interface Token {
  auth: any;
  data: {
  message: string;
  perfil: string;
  auth: {
    token: string;
    type: string;
  };
  data: {
    id: number;
    run: string;
    nombre: string;
    apellido: string;
    nombre_completo: string;
    correo: string;
    perfil: string;
    img: string;
  };};
}
