import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos

import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';

//componentes
import { PointsOfSalesComponent } from './components/points-of-sales/points-of-sales.component';
import { AddEditPosComponent } from './components/add-edit-pos/add-edit-pos.component';
import { InfoPosComponent } from './components/info-pos/info-pos.component';

@NgModule({
  declarations: [PointsOfSalesComponent, AddEditPosComponent, InfoPosComponent],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule],
})
export class PointOfSalesAdminModule {}
