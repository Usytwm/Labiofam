import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Interfaces/Product';
import { AbstractService } from './generic-crud.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService  extends AbstractService<Product> {
  private appUr2: string = environment.endpoint;
  protected apiUr2?: string;
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/products/';
  }
  getID(id: string): Observable<Product|undefined> {
    return this._http.get<Product>(`${this.appUr2}${this.apiUrl}${id}`)
    .pipe(
      catchError( error => of(undefined))
     );
  }
}
