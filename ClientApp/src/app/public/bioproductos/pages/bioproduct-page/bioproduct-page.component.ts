import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-bioproduct-page',
  templateUrl: './bioproduct-page.component.html',
  styles: [
  ]
})
export class BioproductPageComponent implements OnInit {
  id: string;
  public product?: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({product_ID}) => this.productService.getID(product_ID)),
      )
      .subscribe( product => {
        if( !product) return this.router.navigate([ '/bioproduct/list']);
        this.product = product;
        return;
      })
  }
  goBack():void {
    this.router.navigateByUrl('/bioproduct/list')
  }
}

