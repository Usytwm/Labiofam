import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapaComponent } from './components/mapa/mapa.component';
import { InfoPOSComponent } from './components/info-point-of-sale/info.component';

import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  declarations: [MapaComponent, InfoPOSComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PointsOfSalesModule {}
