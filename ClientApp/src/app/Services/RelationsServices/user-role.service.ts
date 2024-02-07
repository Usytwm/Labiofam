import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { User_Product } from 'src/app/Interfaces/User_Product';
import { User_Role } from 'src/app/Interfaces/User_Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends RelationService<User_Role> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/UserRole/';
  }
  getUR(idUser: string, idRole: string): Observable<User_Role> {
    return this._http.get<User_Role>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`
    );
  }

  addUR(idUser: string, idRole: string): Observable<User_Role> {
    return this._http.post<User_Role>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  removeUR(idUser: string, idRole: string): Observable<void> {
    return this._http.delete<void>(
      `${this.appUrl}${this.apiUrl}${idUser}/${idRole}`,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
