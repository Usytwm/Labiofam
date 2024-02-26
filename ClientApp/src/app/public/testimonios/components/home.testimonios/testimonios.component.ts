import { Component, OnInit } from '@angular/core';
import { Testimonio } from '../../../../Interfaces/Testimonios';
import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
})
export class TestimoniosComponent implements OnInit {
  loading: Boolean = false;
  Testimonios: Testimonio[] = [];
  getPhoto(data: Testimonio) {
    data.image;
    this._fotoservice.getPhoto(data.image!).subscribe((photo) => {
      photo.text().then((text) => {
        data.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  constructor(
    private _testimonioService: TestimoniosService,
    private _fotoservice: FileService,
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
      this.Testimonios.forEach((testimonio) => {
        if (testimonio.image != null) this.getPhoto(testimonio);
      });
      this.Testimonios = this.Testimonios.filter((x) => x.image == null);
      this.loading = false;
    });
  }
  getYoutubeThumbnail(url: string, defaultImageUrl: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let parts = url.split('/');
      let videoIdPart = parts.pop() || '';
      let videoId = videoIdPart.split('?')[0];
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else {
      return defaultImageUrl;
    }
  }
}
