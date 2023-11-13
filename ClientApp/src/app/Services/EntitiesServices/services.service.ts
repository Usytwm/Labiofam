import { Service } from '../../Interfaces/Service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends EntityAbstractService<Service> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Service/';
  }
}
