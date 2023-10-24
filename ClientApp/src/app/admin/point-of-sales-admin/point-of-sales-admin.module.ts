import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { PointOfSalesAdminRoutingModule } from './point-of-sales-admin-routing.module';
import { GenericTableModule } from '../generic-table/generic-table.module';

//componentes
import { PointsOfSalesComponent } from './components/points-of-sales/points-of-sales.component';

@NgModule({
  declarations: [PointsOfSalesComponent],
  imports: [CommonModule, PointOfSalesAdminRoutingModule, GenericTableModule],
})
export class PointOfSalesAdminModule {}
