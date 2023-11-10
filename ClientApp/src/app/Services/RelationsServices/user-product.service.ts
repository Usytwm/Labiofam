import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RelationService } from '../BaseServices/relation-abstract.service';
import { User_Product } from 'src/app/Interfaces/User_Product';

@Injectable({
  providedIn: 'root',
})
export class UserProductService extends RelationService<User_Product> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/UserProduct/';
  }
}
