import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { PointsOfSalesModule } from './establecimientos/points-of-sales.module';
import { ServicesModule } from './servicios/servicios.module';
import { ContactosModule } from './contactos/contactos.module';
import { BioproductosModule } from './bioproductos/bioproductos.module';
import { TestimoniosModule } from './testimonios/testimonios.module';

//componentes
//import { NavComponent } from '../Components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [FooterComponent, PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    PointsOfSalesModule,
    ServicesModule,
    ContactosModule,
    BioproductosModule,
    FontAwesomeModule,
    TestimoniosModule,
  ],
})
export class PublicModule {}
