import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { TypePrice } from 'src/app/Interfaces/TypePrice';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { FileService } from 'src/app/Services/FilesService/File.service';
import { ProductTypePriceFilterService } from 'src/app/Services/FilterServices/TypePrice-Product-filter.service';

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
  types: TypePrice[] = [];
  constructor(
    private _bioproductsservices: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _photoservice: FileService,
    private _filter: ProductTypePriceFilterService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.id !== 'null') {
      this.getBioproduct(this.id);
    }
  }
  getBioproduct(id: string) {
    this.loading = true;
    this._bioproductsservices.get(id).subscribe((data) => {
      this.bioproducto = data;
      console.log(data);

      if (this.bioproducto.image)
        this._photoservice
          .getPhoto(this.bioproducto.image)
          .subscribe((photo) => {
            photo.text().then((text) => {
              this.imageUrls[this.bioproducto!.id!] =
                'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
            });
          });
      this.loading = false;
    });
    this._filter.getType2byType1(id).subscribe((type) => {
      this.types = type;
    });
  }
  goBack(): void {
    this.router.navigateByUrl('Bioproducts');
  }
  objectKeys(summary: Record<string, string>) {
    return Object.keys(summary);
  }
}
