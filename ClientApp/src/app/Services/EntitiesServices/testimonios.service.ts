import { Testimonio } from '../../Interfaces/Testimonios';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class TestimoniosService extends EntityAbstractService<Testimonio> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Testimonios/';
  }
}
