import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { FileService } from 'src/app/Services/FilesService/File.service';


@Component({
  selector: 'app-bioproduct-page',
  templateUrl: './bioproduct-page.component.html',
  styleUrls: ['./bioproduct-page.component.css'],

})
export class BioproductPageComponent {
  loading = false;
  id: string;
  bioproducto?: Product;
  imageUrls: { [key: string]: string } = {};
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _bioproductsservices: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _photoservice: FileService
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
      if (this.bioproducto.image)
        this.imageUrls[this.bioproducto.id!] = this._photoservice.getPhotoUrl(
          this.bioproducto.image
        );
      console.log(data);
      this.loading = false;
    });
  }
  goBack(): void {
    this.router.navigateByUrl('Bioproducts')
  }

}
