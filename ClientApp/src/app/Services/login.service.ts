import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../Interfaces/Loginmodel';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private appUrl: string = environment.endpoint;
  private webApi = 'api/Registration/login'; // Asegúrate de usar HTTPS

  constructor(private http: HttpClient) {}

  sendData(datos: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.appUrl}${this.webApi}`, datos);
  }
}
