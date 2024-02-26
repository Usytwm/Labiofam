import { Component, Input, OnInit } from '@angular/core';
import { Testimonio } from 'src/app/Interfaces/Testimonios';
import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
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
  Testimonios: Testimonio[] = [];

  // Constructor de la clase
  constructor(
    private _testimonioService: TestimoniosService,
    private _fotoservice: FileService
  ) {}
  ngOnInit(): void {
    this.obtenerTestimonios();
  }

  getPhoto(data: Testimonio) {
    data.image;
    this._fotoservice.getPhoto(data.image!).subscribe((photo) => {
      photo.text().then((text) => {
        data.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  obtenerTestimonios() {
    this._testimonioService.getAll().subscribe((data) => {
      this.Testimonios = data;
      this.Testimonios.forEach((testimonio) => {
        if (testimonio.image != null) this.getPhoto(testimonio);
      });
      this.Testimonios = this.Testimonios.filter((x) => x.image != null);
    });
  }
}
