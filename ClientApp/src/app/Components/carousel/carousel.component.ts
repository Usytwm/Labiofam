import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  // Arreglo de imágenes para el carrusel
  images = [
    {
      imageSrc: 'assets/1.jpg',
      imageAlt: 'nature1',
      imageName: 'img1',
      imageDesc: 'Description1',
    },
    {
      imageSrc: 'assets/2.jpg',
      imageAlt: 'nature2',
      imageName: 'img2',
      imageDesc: 'Description2',
    },
    {
      imageSrc: 'assets/3.jpg',
      imageAlt: 'nature3',
      imageName: 'img3',
      imageDesc: 'Description3',
    },
    {
      imageSrc: 'assets/4.jpg',
      imageAlt: 'nature4',
      imageName: 'img4',
      imageDesc: 'Description4',
    },
    {
      imageSrc: 'assets/5.jpg',
      imageAlt: 'nature5',
      imageName: 'img5',
      imageDesc: 'Description5',
    },
    {
      imageSrc: 'assets/6.jpg',
      imageAlt: 'nature6',
      imageName: 'img6',
      imageDesc: 'Description6',
    },
  ];

  // Entradas del componente que pueden ser pasadas desde un componente padre
  @Input() indicators = true; // Booleano para mostrar los indicadores del carrusel
  @Input() controls = true; // Booleano para mostrar los controles del carrusel
  @Input() autoslide = true; // Booleano para deslizar las imágenes automáticamente
  @Input() slideInterval = 5000; // Intervalo en milisegundos entre cada deslizamiento automático

  // Índice de la imagen actualmente seleccionada en el carrusel
  selectedIndex = 0;

  // ID del intervalo utilizado para el deslizamiento automático de las imágenes
  slideIntervalId: any;

  // Constructor de la clase
  constructor() {
    // Si autoslide es verdadero, iniciamos el deslizamiento automático de las imágenes
    if (this.autoslide) {
      this.autoSlideImages();
    }
  }

  // Método para iniciar el deslizamiento automático de las imágenes
  autoSlideImages(): void {
    this.slideIntervalId = setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  // Método del ciclo de vida de Angular que se llama automáticamente cuando se inicializa el componente
  ngOnInit(): void {}

  // Método para establecer el índice de la imagen seleccionada cuando se hace clic en un indicador
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  // Método para cambiar a la imagen anterior en el carrusel
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  // Método para cambiar a la siguiente imagen en el carrusel
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  // Método para detener el deslizamiento automático cuando el mouse pasa por encima del carrusel
  onMouseOver(): void {
    clearInterval(this.slideIntervalId);
  }

  // Método para reiniciar el deslizamiento automático cuando el mouse sale del carrusel
  onMouseOut(): void {
    this.autoSlideImages();
  }
}
