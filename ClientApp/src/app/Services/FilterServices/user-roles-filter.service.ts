import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelationFilterService } from '../BaseServices/relation-filter-abstract.service';
import { User } from 'src/app/Interfaces/User';
import { Role } from 'src/app/Interfaces/Role';

@Injectable({
  providedIn: 'root',
})
export class UserRoleFilterService extends RelationFilterService<User, Role> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/UserRoleFilter/';
  }
}
