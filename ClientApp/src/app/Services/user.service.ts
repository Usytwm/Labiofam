import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/User';
import { AbstractService } from '../Services/generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService<User> {
  constructor(_http: HttpClient) {
    super(_http, 'api/User/');
  }
}