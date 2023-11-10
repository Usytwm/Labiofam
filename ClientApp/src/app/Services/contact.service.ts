import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './generic-crud.service';
import { Contact } from '../Interfaces/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends AbstractService<Contact> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Contact/';
  }
}
