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
      label: 'Descubre Nuestros Bioproductos',
      content:
        'Explora nuestra amplia gama de bioproductos de alta calidad, diseñados para mejorar tu vida de manera sostenible',
      button: 'Ver productos',
      buttonsrc: 'bioproduct',
    },
    {
      src: 'assets/2.jpg',
      alt: '...',
      label: 'Visita Nuestros Establecimientos',
      content:
        'Encuentra el establecimiento más cercano y descubre nuestros bioproductos en persona',
      button: 'Ver establecimientos',
      buttonsrc: 'point-of-sales',
    },
    {
      src: 'assets/3.jpg',
      alt: 'Servicios',
      label: 'Servicios Personalizados para Ti',
      content:
        '“Ofrecemos una variedad de servicios adaptados a tus necesidades, ayudándote a aprovechar al máximo nuestros bioproductos',
      button: 'Ver servicios',
      buttonsrc: 'Services',
    },
    {
      src: 'assets/4.jpg',
      alt: '...',
      label: 'Estamos Aquí para Ayudarte',
      content:
        '¿Tienes alguna pregunta o necesitas ayuda? No dudes en ponerte en contacto con nosotros',
      button: 'Contactar',
      buttonsrc: 'feedback',
    },
  ];

  // Constructor de la clase
  constructor() {}
}
