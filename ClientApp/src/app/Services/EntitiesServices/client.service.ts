import { Injectable } from '@angular/core';
import { Client } from '../../Interfaces/Client';
import { HttpClient } from '@angular/common/http';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends EntityAbstractService<Client> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Client/';
  }
}
