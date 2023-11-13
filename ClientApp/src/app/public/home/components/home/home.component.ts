import { Component } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this._productService.take(3).subscribe((data) => {
      this.products = data;
    });
  }
}
