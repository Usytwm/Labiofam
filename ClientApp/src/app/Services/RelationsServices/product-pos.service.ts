import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { Product_POS } from 'src/app/Interfaces/Product_POS';

@Injectable({
  providedIn: 'root',
})
export class ProductPosService extends RelationService<Product_POS> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/ProductPOS/';
  }
}
