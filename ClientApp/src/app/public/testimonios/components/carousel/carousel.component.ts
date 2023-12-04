import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  // Arreglo de imágenes para el carrusel
  images = [
    {
      src: 'assets/1.jpg',
      alt: 'Bioproductos',
      label: 'Damos fé de nuestros productos',
      content:
        'La calidad es la calidad y sin calidad no hay calidad. El mejor detergente líquido lo tenemos aquí. Somos los reyes de la sosa cáustica',
    },
    {
      src: 'assets/2.jpg',
      alt: 'Bioproductos',
      label: 'Damos fé de nuestros productos',
      content:
        'La calidad es la calidad y sin calidad no hay calidad. El mejor detergente líquido lo tenemos aquí. Somos los reyes de la sosa cáustica',
    },
    {
      src: 'assets/3.jpg',
      alt: 'Bioproductos',
      label: 'Damos fé de nuestros productos',
      content:
        'La calidad es la calidad y sin calidad no hay calidad. El mejor detergente líquido lo tenemos aquí. Somos los reyes de la sosa cáustica',
    },
  ];

  // Constructor de la clase
  constructor() {}
}
