import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';

@Component({
  selector: 'app-bioproduct-list',
  templateUrl: './bioproduct-list.component.html',
  styleUrls: ['./bioproduct-list.component.css'],
})
export class BioproductListComponent {
  @Input() products!: Product[];
}
