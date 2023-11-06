<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
import { AbstractService } from './generic-crud.service';
import { Contact } from '../Interfaces/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends AbstractService<Contact> {
  constructor(_http: HttpClient) {
    super(_http);
<<<<<<< HEAD
    this.apiUrl = '/contacts';
=======
    this.apiUrl = 'api/Contact/';
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
  }
}
