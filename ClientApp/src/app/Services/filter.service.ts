import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../Interfaces/Role';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/User';
import { Product } from '../Interfaces/Product';
import { Point_of_Sales } from '../Interfaces/Point_of_sales';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private baseUrl: string = environment.endpoint;
  private apiUrl: string = 'api/RelationFilter';
  constructor(private _http: HttpClient) {}

  getrolesbyuser(id: string): Observable<Role[]> {
    return this._http.get<Role[]>(
      `${this.baseUrl}${this.apiUrl}/getrolesbyuser?user_id=${id}`
    );
  }
  getusersbyrole(id: string): Observable<User[]> {
    return this._http.get<User[]>(
      `${this.baseUrl}${this.apiUrl}/getusersbyrole/${id}`
    );
  }
  getproductsbyuser(id: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this.baseUrl}${this.apiUrl}/getproductsbyuser/${id}`
    );
  }

  getusersbyproduct(id: string): Observable<User[]> {
    return this._http.get<User[]>(
      `${this.baseUrl}${this.apiUrl}/getusersbyproduct/${id}`
    );
  }
  getposbyproduct(id: string): Observable<Point_of_Sales[]> {
    return this._http.get<Point_of_Sales[]>(
      `${this.baseUrl}${this.apiUrl}/getposbyproduct/${id}`
    );
  }
  getproductsbypos(id: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this.baseUrl}${this.apiUrl}/getproductsbypos/${id}`
    );
  }
}
