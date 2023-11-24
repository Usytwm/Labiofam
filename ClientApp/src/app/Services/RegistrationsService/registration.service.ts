import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationModel } from '../../Interfaces/registration-model';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService extends EntityAbstractService<RegistrationModel> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/User/';
  }
}
