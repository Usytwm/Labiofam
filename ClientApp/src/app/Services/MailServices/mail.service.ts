import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private baseUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Mail/';
  constructor(private _http: HttpClient) {}

  sendData(
    sendername: string,
    email: string,
    subject: string,
    message: string
  ): Observable<void> {
    console.log({
      sendername,
      email,
      subject,
      message,
    });

    let params = new HttpParams()
      .set('sender_name', sendername)
      .set('sender_email', email)
      .set('subject', subject)
      .set('message', message);

    return this._http.post<void>(
      `${this.baseUrl}${this.apiUrl}`,
      {},
      { params: params, responseType: 'text' as 'json' }
    );
  }
}
