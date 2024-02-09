import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { RelationFilterService } from '../BaseServices/relation-filter-abstract.service';
import { TypePrice } from 'src/app/Interfaces/TypePrice';

@Injectable({
  providedIn: 'root',
})
export class ProductTypePriceFilterService extends RelationFilterService<
  TypePrice,
  Product
> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/TypeProductFilter/';
  }
}
