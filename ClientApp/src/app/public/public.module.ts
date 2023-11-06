import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { PointsOfSalesModule } from './establecimientos/points-of-sales.module';
import { ServicesModule } from './servicios/servicios.module';
import { ContactosModule } from './contactos/contactos.module';
import { BioproductosModule } from './bioproductos/bioproductos.module';
import { SharedModule } from '../Shared/shared.module';



//componentes
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    PublicComponent],

  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    PointsOfSalesModule,
    ServicesModule,
    ContactosModule,
<<<<<<< HEAD
    BioproductosModule,
    SharedModule,
    //Pipes

=======
    FontAwesomeModule,
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
  ],
})
export class PublicModule {}
