import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { User_Product } from 'src/app/Interfaces/User_Product';
import { User_Role } from 'src/app/Interfaces/User_Role';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends RelationService<User_Role> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/UserRole/';
  }
}
