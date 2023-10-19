import { Injectable } from '@angular/core';
import { AbstractService } from './generic-crud.service';
import { Point_of_Sales } from '../Interfaces/Point_of_sales';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PointsOfSalesService extends AbstractService<Point_of_Sales> {
  constructor(_http: HttpClient) {
    super(_http, 'api/PointOfSales/');
  }
}
