import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BioproductModuleModule } from '../components/bioproduct-module/bioproduct-module.module';

//componentes
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [HomeComponent, CarouselComponent],
  imports: [CommonModule, RouterModule, BioproductModuleModule],
})
export class HomeModule {}
