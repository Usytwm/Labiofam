import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { MapaModule } from './mapa/mapa.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ContactosModule } from './contactos/contactos.module';

//componentes
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HomeModule,
    MapaModule,
    ServiciosModule,
    ContactosModule,
  ],
})
export class PublicModule {}
