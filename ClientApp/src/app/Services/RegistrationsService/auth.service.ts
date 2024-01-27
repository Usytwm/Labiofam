import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';
import { CookieService } from 'ngx-cookie-service';
interface LoginResponse {
  name: string;
  token: string;
  refreshToken: string;
  expirationDate: string;
  refreshTokenExpirationDate: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(
    // this._coockieservice.check(environment.token_name)
    !!localStorage.getItem(environment.token_name)
  );
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(
    private http: HttpClient,
    // private _coockieservice: CookieService
  ) {}

  login(data: LoginModel): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.appUrl}${this.apiUrl}/login`, data)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.token_name);
    //this._coockieservice.delete(environment.token_name);
    this.loggedIn.next(false);
    return this.http.post(`${this.appUrl}${this.apiUrl}/logout`, null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken() {
    return localStorage.getItem(environment.token_name); //this._coockieservice.get(environment.token_name);
  }

  getData(token: string): Observable<RegistrationRequestModel> {
    return this.http.get<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}/token/${token}`,
      {
        withCredentials: true,
      }
    );
  }
  storeToken(token: string, expired: string) {
    // Convierte la cadena de texto 'expired' a un objeto Date de JavaScript.
    // var fechaExpiracion = new Date();
    // fechaExpiracion.setMinutes(fechaExpiracion.getMinutes() + 10);
    // Usa 'fechaExpiracion' para establecer la fecha de expiración de la cookie.
    //this._coockieservice.set(environment.token_name, token, fechaExpiracion);
    localStorage.setItem(environment.token_name, token);
  }

  register(
    data: RegistrationRequestModel
  ): Observable<RegistrationRequestModel> {
    return this.http.post<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}`,
      data
    );
  }
}
