import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Interfaces/User';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityAbstractService<User> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/User/';
  }
}
