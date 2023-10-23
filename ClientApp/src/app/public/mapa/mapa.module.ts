import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapaComponent } from './components/mapa/mapa.component';


@NgModule({
  declarations: [
    MapaComponent
  ],
  imports: [
    CommonModule,
    MapaRoutingModule
  ]
})
export class MapaModule { }
