import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<T> {
  private appUrl: string = environment.endpoint;

  constructor(protected _http: HttpClient, private apiUrl: string) {}

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.appUrl}${this.apiUrl}`);
  }

  get(id: string): Observable<T> {
    return this._http.get<T>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  add(item: T): Observable<T> {
    return this._http.post<T>(`${this.appUrl}${this.apiUrl}`, item);
  }

  update(id: string, item: T): Observable<void> {
    return this._http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, item);
  }
}
