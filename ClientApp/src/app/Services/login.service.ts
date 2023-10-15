import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private appUrl: string = environment.endpoint;
  private webApi = 'api/login'; // Asegúrate de usar HTTPS

  constructor(private http: HttpClient) {}

  sendData(datos: { correo: string; pasword: string }): Observable<any> {
    datos.pasword = CryptoJS.SHA256(datos.pasword).toString();
    return this.http.post(`${this.appUrl}${this.webApi}`, datos);
  }
}
