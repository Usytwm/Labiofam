import { Component, OnInit} from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/product.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: [ './list-page.component.css'
  ]
})
export class ListPageComponent implements OnInit {
  public products: Product[] = [];

  constructor( private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAll()
      .subscribe( products => this.products = products)
  }
}
