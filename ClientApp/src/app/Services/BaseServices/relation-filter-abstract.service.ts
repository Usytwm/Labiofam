import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../../Interfaces/Role';
import { Observable } from 'rxjs';
import { User } from '../../Interfaces/User';
import { Product } from '../../Interfaces/Product';
import { Point_of_Sales } from '../../Interfaces/Point_of_sales';

@Injectable({
  providedIn: 'root',
})
export abstract class RelationFilterService<T1, T2> {
  private baseUrl: string = environment.endpoint;
  protected apiUrl?: string;
  constructor(private _http: HttpClient) {}

  getType1byType2(id_Type_1: string): Observable<T2[]> {
    console.log(
      `${this.baseUrl}${this.apiUrl}gettype2bytype1?type1_id=${id_Type_1}`
    );

    return this._http.get<T2[]>(
      `${this.baseUrl}${this.apiUrl}gettype2bytype1?type1_id=${id_Type_1}`
    );
  }
  getType2byType1(id_Type_2: string): Observable<T1[]> {
    return this._http.get<T1[]>(
      `${this.baseUrl}${this.apiUrl}gettype1bytype2?type2_id=${id_Type_2}`
    );
  }
  getType2ByType1Substring(substring: string): Observable<T2[]> {
    return this._http.get<T2[]>(
      `${this.baseUrl}${this.apiUrl}gettype2bytype1/${substring}`
    );
  }

  getType1ByType2Substring(substring: string): Observable<T1[]> {
    return this._http.get<T1[]>(
      `${this.baseUrl}${this.apiUrl}gettype1bytype2/${substring}`
    );
  }

  addType2ByType1(type1_id: string, collection: T2[]): Observable<void> {
    let params = new HttpParams().set('type1_id', type1_id);
    return this._http.post<void>(
      `${this.baseUrl}${this.apiUrl}addtype2bytype1`,
      collection,
      {
        params: params,
        responseType: 'text' as 'json',
      }
    );
  }

  addType1ByType2(type2_id: string, collection: T1[]): Observable<void> {
    return this._http.post<void>(
      `${this.baseUrl}${this.apiUrl}addtype1bytype2/${type2_id}`,
      collection,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
