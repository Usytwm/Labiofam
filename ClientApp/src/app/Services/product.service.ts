import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Interfaces/Product';
import { AbstractService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService<Product> {
  constructor(_http: HttpClient) {
    super(_http, 'api/Product/');
  }
}
