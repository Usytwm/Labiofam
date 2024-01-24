import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';
import { CookieService } from 'ngx-cookie-service';
interface LoginResponse {
  token: string;
  expirationDate: string;
  // otras propiedades si las hay
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(
    this._coockieservice.check(environment.token_name)
  );
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(
    private http: HttpClient,
    private _coockieservice: CookieService
  ) {}

  login(data: LoginModel): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.appUrl}${this.apiUrl}/login`, data)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.saveCookie(response.token, response.expirationDate);
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout() {
    this._coockieservice.delete(environment.token_name);
    this.loggedIn.next(false);
    return this.http.post(`${this.appUrl}${this.apiUrl}/logout`, null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken() {
    const token = this._coockieservice.get(environment.token_name);
    return token;
  }

  getData(token: string): Observable<RegistrationRequestModel> {
    return this.http.get<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}/${token}`,
      {
        withCredentials: true,
      }
    );
  }
  saveCookie(token: string, expired: string) {
    // Convierte la cadena de texto 'expired' a un objeto Date de JavaScript.
    var fechaExpiracion = new Date();
    fechaExpiracion.setMinutes(fechaExpiracion.getMinutes() + 10);
    console.log(fechaExpiracion);

    // Usa 'fechaExpiracion' para establecer la fecha de expiración de la cookie.
    this._coockieservice.set(environment.token_name, token, fechaExpiracion);
  }

  // saveCookie(token: string, expired: string) {
  //   //!!Ki me falta poner para que expire
  //   var fechaExpiracion = new Date();
  //   fechaExpiracion.setDate(fechaExpiracion.getDate() + 10);
  //   this._coockieservice.set(environment.token_name, token, fechaExpiracion);
  // }

  register(
    data: RegistrationRequestModel
  ): Observable<RegistrationRequestModel> {
    return this.http.post<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}`,
      data
    );
  }
}
