import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bioprduct-cards-placeholder',
  templateUrl: './bioprduct-cards-placeholder.component.html',
  styleUrls: ['./bioprduct-cards-placeholder.component.css'],
})
export class BioprductCardsPlaceholderComponent {
  @Input() columnas: number = 3;
  @Input() cantidad!: number;
  _cantidad: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cantidad']) {
      this._cantidad = Array.from({ length: this.cantidad }, (v, k) => k + 1);
    }
  }
}
