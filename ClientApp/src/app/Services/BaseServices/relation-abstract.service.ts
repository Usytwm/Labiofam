import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBaseService } from '../Interfaces/Base';
@Injectable({
  providedIn: 'root',
})
export abstract class RelationService<T> implements IBaseService<T> {
  protected appUrl: string = environment.endpoint;
  protected apiUrl?: string;
  constructor(protected _http: HttpClient) {}

  get(id: string): Observable<T> {
    return this._http.get<T>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  add(newEntity: T): Observable<T> {
    return this._http.post<T>(`${this.appUrl}${this.apiUrl}`, newEntity, {
      responseType: 'text' as 'json',
    });
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.appUrl}${this.apiUrl}all`);
  }

  remove(id: string): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`, {
      responseType: 'text' as 'json',
    });
  }

  removeAll(): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.apiUrl}all`, {
      responseType: 'text' as 'json',
    });
  }

  take(size: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.appUrl}${this.apiUrl}take/${size}`);
  }
}
