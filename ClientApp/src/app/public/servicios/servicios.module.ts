import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './components/servicios/servicios.component';

@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [CommonModule, ServiciosRoutingModule],
})
export class ServiciosModule {}
