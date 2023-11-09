import { Observable } from 'rxjs';
import { IBaseService } from './Base';

export interface IEntityService<T> extends IBaseService<T> {
  getByName(name: string): Observable<T>;
  edit(id: string, editedEntity: T): Observable<void>;
}
