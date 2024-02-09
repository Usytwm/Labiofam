import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';
import { ProductData } from 'src/app/Interfaces/ProductData';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends EntityAbstractService<ProductData> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/Product/';
  }
}
