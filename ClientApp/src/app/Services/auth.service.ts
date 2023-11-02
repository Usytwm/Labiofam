import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../Interfaces/Loginmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private appUrl: string = environment.endpoint;
  private webApi = 'api/Registration/login';

  constructor(private http: HttpClient) {}

  login(datos: LoginModel): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.appUrl}${this.webApi}`, datos)
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
