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

  public product?: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}
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

/*

<ng-template #divReturn>
  [routerLink]="['/product/list']" routerLinkActive="router-link-active"
</ng-template>



<div *ngIf="product; else divReturn" class="grid p-2">
  <mat-card class="col-6 sn:col-6">

    <img [src]="product | productImage" [alt]="product.product_ID" mat-card-image />

  </mat-card>

  <mat-card class="col-12 sm:col-6">
    <mat-card-header>
      <mat-card-title>{{product.name}}</mat-card-title>
    </mat-card-header>

    <mat-card-content>

      <button
        mat-button
        color="blue"
        (click)="goBack()">
        Regresar
      </button>

    </mat-card-content>


  </mat-card>

</div>




*/
