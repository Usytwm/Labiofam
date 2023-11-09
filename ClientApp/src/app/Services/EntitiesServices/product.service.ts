import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Interfaces/Product';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends EntityAbstractService<Product> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Product/';
  }
}
