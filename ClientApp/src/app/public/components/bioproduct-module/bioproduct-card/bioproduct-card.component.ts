import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-bioproduct-card',
  templateUrl: './bioproduct-card.component.html',
  styleUrls: ['./bioproduct-card.component.css'],
})
export class BioproductCardComponent implements OnInit {
  @Input() product?: Product;
  imageUrls: { [key: string]: string } = {};

  constructor(private _photoservice: FileService) {}

  ngOnInit(): void {
    if (this.product && this.product.image) {
      this.imageUrls[this.product.id!] = this._photoservice.getPhotoUrl(
        this.product.image
      );
    }
  }
}
