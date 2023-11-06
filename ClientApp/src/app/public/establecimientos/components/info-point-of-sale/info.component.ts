import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/Interfaces/Product';
import { FilterService } from 'src/app/Services/filter.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoPOSComponent implements OnInit {
  id: string;
  point?: Point_of_Sales;

  products: Product[] = [];

  establecimientos: Point_of_Sales[] = [];
  previousId: string;

  constructor(
    private personaService: PointsOfSalesService,
    private aRoute: ActivatedRoute,
    private _filter: FilterService
  ) {
    this.id = String(this.aRoute.snapshot.paramMap.get('id'));
    this.previousId = this.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== this.previousId) {
        location.reload();
      } else {
        this.getPoint();
      }
      this.previousId = this.id;
    });
  }

  getPoint() {
    this.personaService.get(this.id).subscribe((data) => {
      this.point = data;
    });
    this._filter.getproductsbypos(this.id).subscribe((data) => {
      this.products = data;
    });
    this.personaService.take(3).subscribe((data) => {
      this.establecimientos = data;
    });
  }
}
