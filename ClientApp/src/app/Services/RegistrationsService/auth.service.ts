import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from 'src/app/Interfaces/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem(environment.token_name)
  );
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(
    private http: HttpClient // private _coockieservice: CookieService
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

  clearStorage() {
    localStorage.removeItem(environment.token_name);
    localStorage.removeItem(environment.refresh_token_name);
  }

  logout() {
    this.clearStorage();
    this.loggedIn.next(false);
    return this.http.post(`${this.appUrl}${this.apiUrl}/logout`, null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken() {
    return localStorage.getItem(environment.token_name); //this._coockieservice.get(environment.token_name);
  }

  getRefreshToken() {
    return localStorage.getItem(environment.refresh_token_name); //this._coockieservice.get(environment.token_name);
  }

  generateNewToken(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.appUrl}${this.apiUrl}/getnewaccesstoken`, {
        token: this.getToken(),
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // El refreshToken ha expirado, el usuario debe iniciar sesión nuevamente
            this.logout();
          }
          return throwError(error);
        })
      );
  }

  getData(token: string): Observable<RegistrationRequestModel> {
    return this.http.get<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}/token/${token}`
      // {
      //   withCredentials: true,
      // }
    );
  }

  storeToken(token: string, refresh_token_name: string) {
    localStorage.setItem(environment.token_name, token);
    localStorage.setItem(environment.refresh_token_name, refresh_token_name);
  }

  register(
    data: RegistrationRequestModel
  ): Observable<RegistrationRequestModel> {
    console.log(data);

    return this.http.post<RegistrationRequestModel>(
      `${this.appUrl}${this.apiUrl}`,
      data
    );
  }
}
