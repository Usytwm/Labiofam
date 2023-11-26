import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapaComponent } from './components/mapa/mapa.component';
import { InfoPOSComponent } from './components/info-point-of-sale/info.component';

import { SharedModule } from '../../Shared/shared.module';
import { BioproductModuleModule } from '../components/bioproduct-module/bioproduct-module.module';
@NgModule({
  declarations: [MapaComponent, InfoPOSComponent],
  imports: [CommonModule, RouterModule, SharedModule, BioproductModuleModule],
})
export class PointsOfSalesModule {}
