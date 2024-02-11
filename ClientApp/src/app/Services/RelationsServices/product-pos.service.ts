import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { Product_POS } from 'src/app/Interfaces/Product_POS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductPosService extends RelationService<Product_POS> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/ProductPOS/';
  }

  addwihtsize(newEntity: {
    product_id: string;
    pos_id: string;
    size: number;
  }): Observable<void> {
    return this._http.post<void>(`${this.appUrl}${this.apiUrl}`, newEntity);
  }
  getUPP(idUser: string, idRole: string): Observable<Product_POS> {
    return this._http.get<Product_POS>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`
    );
  }

  addPP(idUser: string, idRole: string): Observable<Product_POS> {
    return this._http.post<Product_POS>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  removePP(idUser: string, idRole: string): Observable<void> {
    return this._http.delete<void>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
