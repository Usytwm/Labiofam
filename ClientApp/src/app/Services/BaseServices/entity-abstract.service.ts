import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelationService } from './relation-abstract.service';
@Injectable({
  providedIn: 'root',
})
export abstract class EntityAbstractService<T> extends RelationService<T> {
  getByName(name: string): Observable<T> {
    return this._http.get<T>(`${this.appUrl}${this.apiUrl}name/${name}`);
  }

  edit(id: string, editedEntity: T): Observable<void> {
    return this._http.put<void>(
      `${this.appUrl}${this.apiUrl}${id}`,
      editedEntity,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  takerange(size: number, page_number: number): Observable<T[]> {
    return this._http.get<T[]>(
      `${this.appUrl}${this.apiUrl}take/${size}${page_number}`
    );
  }
}
