import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEntityService } from '../Interfaces/Entity';
@Injectable({
  providedIn: 'root',
})
export abstract class EntityAbstractService<T> implements IEntityService<T> {
  private appUrl: string = environment.endpoint;
  protected apiUrl?: string;
  constructor(protected _http: HttpClient) {}

  get(id: string): Observable<T> {
    return this._http.get<T>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  getByName(name: string): Observable<T> {
    return this._http.get<T>(`${this.appUrl}${this.apiUrl}${name}`);
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.appUrl}${this.apiUrl}all`);
  }

  add(newEntity: T): Observable<T> {
    return this._http.post<T>(`${this.appUrl}${this.apiUrl}`, newEntity);
  }

  edit(id: string, editedEntity: T): Observable<void> {
    return this._http.put<void>(
      `${this.appUrl}${this.apiUrl}${id}`,
      editedEntity
    );
  }

  remove(id: string): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`);
  }

  removeAll(): Observable<void> {
    return this._http.delete<void>(`${this.appUrl}${this.apiUrl}`);
  }

  take(size: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.appUrl}${this.apiUrl}take/${size}`);
  }
}
