import { Component,OnInit } from '@angular/core';
import { Testimonio } from '../../../../Interfaces/Testimonios';
import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {

  loading: Boolean = false;
  Testimonios: Testimonio[] = [];

  constructor(private _testimonioService: TestimoniosService) {}
  ngOnInit(): void {
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

}
