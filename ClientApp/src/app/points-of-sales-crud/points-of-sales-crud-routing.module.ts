import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'point-of-sales',
    component: HomeComponent,
  },
  {
    path: 'point-of-sales/edit/:id',
    component: CreateComponent,
  },
  {
    path: 'point-of-sales/details/:id',
    component: DetailsComponent,
  },
  {
    path: 'point-of-sales/createuser',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsOfSalesCrudRoutingModule {}
