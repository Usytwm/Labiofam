import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  // Arreglo de imágenes para el carrusel

  images1 = [
    {
      src: 'assets/1.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
    {
      src: 'assets/2.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
    {
      src: 'assets/3.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
    {
      src: 'assets/4.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
    {
      src: 'assets/5.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
    {
      src: 'assets/6.jpg',
      alt: '...',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      button: 'Sign up today',
    },
  ];

  // Constructor de la clase
  constructor() {}
}
