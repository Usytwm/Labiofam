import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../Interfaces/Contact';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends EntityAbstractService<Contact> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Contact/';
  }
}
