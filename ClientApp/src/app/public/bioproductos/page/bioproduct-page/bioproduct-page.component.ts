import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-bioproduct-page',
  templateUrl: './bioproduct-page.component.html',
  styleUrls: ['./bioproduct-page.component.css']
})
export class BioproductPageComponent  {
  loading = false;
  id: string;
  bioproducto?: Product;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _bioproductsservices: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id !== 'null') {
    this.getBioproduct(this.id);

    }
  }
  getBioproduct(id: string) {
    this.loading = true;
    this._bioproductsservices.get(id).subscribe((data) => {
      this.bioproducto = data;
      console.log(data);
      this.loading = false;
    });
  }
  goBack():void {
    this.router.navigateByUrl('Bioproducts')
  }
}
