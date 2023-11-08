import { Service } from './../Interfaces/Service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../Services/generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends AbstractService<Service> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Service/';
  }
}
