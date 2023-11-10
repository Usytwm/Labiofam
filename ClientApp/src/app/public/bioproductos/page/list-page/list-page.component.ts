import { Component } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {
  loading: Boolean = false;
  bioproductos: Product[] = [];
  constructor(
    private _bioproductsservices: ProductService
  ) { }
  ngOnInit(): void {
    this.obtenerBioproductos();
  }
  obtenerBioproductos() {
    this.loading = true;
    this._bioproductsservices.getAll().subscribe((data) => {
      this.bioproductos = data;
      console.log(data);
      this.loading = false;
    });
  }
}
