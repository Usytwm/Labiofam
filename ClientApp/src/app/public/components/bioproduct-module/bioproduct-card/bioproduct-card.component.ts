import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';

@Component({
  selector: 'app-bioproduct-card',
  templateUrl: './bioproduct-card.component.html',
  styleUrls: ['./bioproduct-card.component.css']
})
export class BioproductCardComponent {
  @Input() product?: Product;
}
