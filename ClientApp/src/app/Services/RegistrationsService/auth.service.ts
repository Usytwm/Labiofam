import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(private http: HttpClient) //private _coockieservice: CookieService
  {}

  login(data: LoginModel): Observable<string> {
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/login`, data);
  }

  logout() {
    // this._coockieservice.delete(environment.token_name);
  }

  isLoggedIn() {
    // return this._coockieservice.check(environment.token_name);
  };

  getToken() {
    //return this._coockieservice.get(environment.token_name);
  }

  getData(token: string): Observable<any> {
    return this.http.get(`${this.appUrl}${this.apiUrl}/${token}`);
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
