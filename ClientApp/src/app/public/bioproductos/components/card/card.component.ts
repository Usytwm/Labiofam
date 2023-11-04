import { Component,Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css'
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public product!: Product;

  ngOnInit(): void {
    if(!this.product ) throw Error('Product property is required')
  }
}



/*
<div class="container">
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div data-aos="fade-right" data-aos-duration="500">
        <div class="card" style="width: 25rem">
          <div class="cont">
            <img [src]="product | productImage" [alt]="product.image" />
          </div>
          <div class="card-body">
            <h5 class="card-title text-center" style="font-size: 20px;">{{product.name}}</h5>
            <p class="card-text">
              {{product.type}}
            </p>
            <div class="text-center">
              <a [routerLink]="['/bioproduct/' + product.product_ID]" class="btn btn-primary mx-auto">Detalles</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</
<div pt-lg-3 style="margin-top: 1cm; margin-left: 6cm;">
  <h1 style="font-size: 4rem; color:#3f51b5; font-family: 'Roboto', Times, serif;">Bioproductos</h1>
</div >

*/
