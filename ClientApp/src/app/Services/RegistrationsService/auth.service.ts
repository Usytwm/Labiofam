import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';
import { CookieService } from 'ngx-cookie-service';
interface LoginResponse {
  accessToken: string;
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
          if (response && response.accessToken) {
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout() {
    this._coockieservice.delete(environment.token_name);
    this.loggedIn.next(false);
    console.log(environment.token_name);
    console.log(this.getToken());
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken() {
    return this._coockieservice.get(environment.token_name);
  }

  getData(token: string): Observable<any> {
    return this.http.get(`${this.appUrl}${this.apiUrl}/${token}`, {
      withCredentials: true,
    });
  }

  saveCookie(token: string) {
    this._coockieservice.set(environment.token_name, token);
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
