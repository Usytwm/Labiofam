import { Injectable } from '@angular/core';
import { AbstractService } from '../Services/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersCrudService extends AbstractService<User> {
  constructor(_http: HttpClient) {
    super(_http, 'api/User/');
  }
}
