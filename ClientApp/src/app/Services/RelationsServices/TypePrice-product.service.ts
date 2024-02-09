import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { TypePriceProduct } from 'src/app/Interfaces/TypePriceProduct';

@Injectable({
  providedIn: 'root',
})
export class UserProductService extends RelationService<TypePriceProduct> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/TypeProduct/';
  }
}
