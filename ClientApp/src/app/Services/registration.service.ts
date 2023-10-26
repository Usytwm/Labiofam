import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationModel } from '../Interfaces/registration-model';
import { AbstractService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService extends AbstractService<RegistrationModel> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/User/';
  }
}
