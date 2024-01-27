import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private baseUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Json';
  constructor(private _http: HttpClient) {}

  getPJson(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}${this.apiUrl}/jsonreader`);
  }
}
