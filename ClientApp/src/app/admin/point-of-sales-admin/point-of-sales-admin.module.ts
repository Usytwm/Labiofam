import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos

import { GenericTableModule } from '../generic-table/generic-table.module';

//componentes
import { PointsOfSalesComponent } from './components/points-of-sales/points-of-sales.component';

@NgModule({
  declarations: [PointsOfSalesComponent],
  imports: [CommonModule, GenericTableModule],
})
export class PointOfSalesAdminModule {}
