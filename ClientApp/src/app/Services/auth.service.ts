import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../Interfaces/Loginmodel';
import { RegistrationModel } from '../Interfaces/registration-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appUrl: string = environment.endpoint;
  private apiUrl = 'api/Registration';

  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(
        `${this.appUrl}${this.apiUrl}/login`,
        data
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(data: RegistrationModel): Observable<RegistrationModel> {
    return this.http.post<RegistrationModel>(
      `${this.appUrl}${this.apiUrl}`,
      data
    );
  }
}
