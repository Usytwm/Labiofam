import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { RelationFilterService } from '../BaseServices/relation-filter-abstract.service';
import { User } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserProductFilterService extends RelationFilterService<
  User,
  Product
> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/UserProductFilter/';
  }
}
