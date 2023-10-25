import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [MapaComponent],
  imports: [CommonModule, RouterModule],
})
export class MapaModule {}
