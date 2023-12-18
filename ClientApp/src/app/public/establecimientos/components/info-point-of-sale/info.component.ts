import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { PointsOfSalesService } from 'src/app/Services/EntitiesServices/points-of-sales.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/Interfaces/Product';
import { ProductPosFilterService } from 'src/app/Services/FilterServices/product-pos-filter.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoPOSComponent implements OnInit {
  id: string;
  point?: Point_of_Sales;
  imageUrls: { [key: string]: string } = {};

  products: Product[] = [];

  establecimientos: Point_of_Sales[] = [];
  previousId: string;

  constructor(
    private pointService: PointsOfSalesService,
    private aRoute: ActivatedRoute,
    private _filter: ProductPosFilterService,
    private _photoservice: FileService
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
    this.pointService.get(this.id).subscribe((data) => {
      this.point = data;
      if (this.point.image)
        this.imageUrls[this.point.id!] = this._photoservice.getPhotoUrl(
          this.point.image
        );
    });
    this._filter.getType2byType1(this.id).subscribe((data) => {
      this.products = data;
    });
    this.pointService.take(3).subscribe((data) => {
      this.establecimientos = data;
      this.establecimientos.forEach((establecimiento) => {
        if (establecimiento.image)
          this.imageUrls[establecimiento.id!] = this._photoservice.getPhotoUrl(
            establecimiento.image
          );
      });
    });
  }
}
