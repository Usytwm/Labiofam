import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//componentes
import { TestimoniosComponent } from './components/home.testimonios/testimonios.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [TestimoniosComponent, CarouselComponent],
  imports: [CommonModule, RouterModule],
})
export class TestimoniosModule {}
