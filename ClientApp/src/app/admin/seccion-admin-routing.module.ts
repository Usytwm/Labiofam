import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from './users-admin/components/users-admin/users-admin.component';
import { PointsOfSalesComponent } from './point-of-sales-admin/components/points-of-sales/points-of-sales.component';

const routes: Routes = [
  { path: 'dashboard/users', component: UsersAdminComponent },
  {
    path: 'dashboard/points-of-sales',
    component: PointsOfSalesComponent,
  },

  // otras rutas que deben mostrarse dentro de PublicComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionAdminRoutingModule {}
