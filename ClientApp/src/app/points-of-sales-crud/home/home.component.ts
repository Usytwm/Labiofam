import { Component, OnInit } from '@angular/core';
import { PointOfSalesCrudService } from '../point-of-sales-crud.service';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Point_of_Sales[] = [];

  constructor(private _PointOfSalesCrudService: PointOfSalesCrudService) {}

  ngOnInit() {
    this._PointOfSalesCrudService
      .getAll()
      .subscribe((data: Point_of_Sales[]) => {
        console.log(data);
        this.products = data;
      });
  }
  delete(id: string) {
    this._PointOfSalesCrudService.delete(id).subscribe((data) => {});
  }
}
