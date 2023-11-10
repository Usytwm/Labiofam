import { Injectable } from '@angular/core';
import { Point_of_Sales } from '../../Interfaces/Point_of_sales';
import { HttpClient } from '@angular/common/http';
import { EntityAbstractService } from '../BaseServices/entity-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class PointsOfSalesService extends EntityAbstractService<Point_of_Sales> {
  constructor(_http: HttpClient) {
    super(_http);
    this.apiUrl = 'api/PointOfSales/';
  }
}
