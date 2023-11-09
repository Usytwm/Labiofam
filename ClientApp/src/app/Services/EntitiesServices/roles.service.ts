import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../Interfaces/Role';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends EntityAbstractService<Role> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Role/';
  }
}
