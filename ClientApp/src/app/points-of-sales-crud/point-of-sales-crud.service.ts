import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractService } from '../Services/generic-crud.service';
import { Point_of_Sales } from '../Interfaces/Point_of_sales';

@Injectable({
  providedIn: 'root',
})
export class PointOfSalesCrudService extends AbstractService<Point_of_Sales> {
  constructor(_http: HttpClient) {
    super(_http, 'api/PointOfSales/');
  }
}
