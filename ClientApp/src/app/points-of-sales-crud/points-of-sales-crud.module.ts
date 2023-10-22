import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//modulos
import { SharedModule } from '../Shared/shared.module';
import { GenericCrudsModule } from '../generic-cruds/generic-cruds.module';

import { PointsOfSalesCrudRoutingModule } from './points-of-sales-crud-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [HomeComponent, DetailsComponent, CreateComponent],
  imports: [
    CommonModule,
    PointsOfSalesCrudRoutingModule,
    HttpClientModule,
    FormsModule,
    GenericCrudsModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    PointsOfSalesCrudRoutingModule,
    HttpClientModule,
    FormsModule,
    GenericCrudsModule,
    SharedModule,
  ],
})
export class PointsOfSalesCrudModule {}
