import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesComponent } from './components/servicios/servicios.component';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, SharedModule],
})
export class ServicesModule {}
