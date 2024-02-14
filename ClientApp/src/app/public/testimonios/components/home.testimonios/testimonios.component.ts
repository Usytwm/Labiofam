import { Component, OnInit } from '@angular/core';
import { Testimonio } from '../../../../Interfaces/Testimonios';
import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
})
export class TestimoniosComponent implements OnInit {
  loading: Boolean = false;
  Testimonios: Testimonio[] = [];

  constructor(
    private _testimonioService: TestimoniosService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.obtenerTestimonios();
  }

  obtenerTestimonios() {
    this.loading = true;
    this._testimonioService.getAll().subscribe((data) => {
      this.Testimonios = data;
      console.log(data);
      this.loading = false;
    });
  }
  getYoutubeThumbnail(url: string): string {
    // Primero, divide la URL por '/' para obtener la parte de la ID del video
    let parts = url.split('/');
    let videoIdPart = parts.pop() || ''; // Obtiene la última parte, que debería ser 'ID?otros_parametros'

    // Luego, divide la parte de la ID por '?' para separar la ID de otros parámetros
    let videoId = videoIdPart.split('?')[0];
    console.log(videoId);

    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
}
