import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PointsOfSalesCrudRoutingModule } from './points-of-sales-crud-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    PointsOfSalesCrudRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    PointsOfSalesCrudRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class PointsOfSalesCrudModule {}
