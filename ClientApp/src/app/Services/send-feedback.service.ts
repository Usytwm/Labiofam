import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SendFeedbackService {
  private appUrl: string = environment.endpoint;
  private webApi = 'api/feedback'; // Asegúrate de usar HTTPS

  constructor(private http: HttpClient) {}

  sendData(datos: { correo: string; comentario: string }): Observable<any> {
    return this.http.post(`${this.appUrl}${this.webApi}`, datos);
  }
}
