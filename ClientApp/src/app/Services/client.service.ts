import { Injectable } from '@angular/core';
import { AbstractService } from './generic-crud.service';
import { Client } from '../Interfaces/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends AbstractService<Client> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Client/';
  }
}
