import { HttpClient } from '@angular/common/http';
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

  sendMail(subject: string, message: string): Observable<void> {
    return this._http.post<void>(`${this.baseUrl}${this.apiUrl}`, {
      subject,
      message,
    });
  }
}
