import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../../Interfaces/Loginmodel';
import { RegistrationModel } from '../../Interfaces/registration-model';
import { RegistrationRequestModel } from '../../Interfaces/Registration-Request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.appUrl}${this.apiUrl}/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('AccessToken', res.accessToken);
        })
      );
  }

  logout() {
    localStorage.removeItem('AccessToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('AccessToken');
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
