import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { RelationFilterService } from '../BaseServices/relation-filter-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ProductPosFilterService extends RelationFilterService<
  Product,
  Point_of_Sales
> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/ProductPOSFilter/';
  }
}
