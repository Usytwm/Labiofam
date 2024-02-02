import { Component, OnInit } from '@angular/core';
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
    private _bioproductsservices: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _photoservice: FileService
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
      // this.imageUrls[this.bioproducto.id!] = this._photoservice.getPhotoUrl(
      //   this.bioproducto.image
      // );
      this.loading = false;
    });
  }
  goBack(): void {
    this.router.navigateByUrl('Bioproducts');
  }
  objectKeys(summary: Record<string, string>) {
    return Object.keys(summary);
  }
}
