import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { AbstractService } from '../Services/generic-crud.service';
import { Role } from '../Interfaces/Role';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends AbstractService<Role> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Role/';
  }
}
