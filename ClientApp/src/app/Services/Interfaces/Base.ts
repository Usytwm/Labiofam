import { Observable } from 'rxjs';

export interface IBaseService<T> {
  get(id: string): Observable<T>;
  add(newEntity: T): Observable<T>;
  remove(id: string): Observable<void>;
  take(size: number): Observable<T[]>;
  getAll(): Observable<T[]>;
  removeAll(): Observable<void>;
}
