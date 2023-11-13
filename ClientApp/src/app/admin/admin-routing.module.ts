import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from './users-admin/components/users-admin/users-admin.component';
import { PointsOfSalesComponent } from './point-of-sales-admin/components/points-of-sales/points-of-sales.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddEditUserComponent } from './users-admin/components/add-edit-user/add-edit-user.component';
import { AddEditPosComponent } from './point-of-sales-admin/components/add-edit-pos/add-edit-pos.component';
import { ServicesAdminComponent } from './services-admin/components/services-admin/services-admin.component';
import { AddEditServiceComponent } from './services-admin/components/add-edit-service/Service-edit.component';
import { InfoPosComponent } from './point-of-sales-admin/components/info-pos/info-pos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SidenavComponent,
    children: [
      { path: 'users-admin', component: UsersAdminComponent },
      { path: 'users-admin/edit/:id', component: AddEditUserComponent },
      { path: 'users-admin/add', component: AddEditUserComponent },
      { path: 'services-admin', component: ServicesAdminComponent },
      { path: 'services-admin/edit/:id', component: AddEditServiceComponent },
      { path: 'services-admin/add', component: AddEditServiceComponent },
      {
        path: 'points-of-sales-admin',
        component: PointsOfSalesComponent,
      },
      {
        path: 'points-of-sales-admin/edit/:id',
        component: AddEditPosComponent,
      },
      { path: 'points-of-sales-admin/add', component: AddEditPosComponent },
      {
        path: 'points-of-sales-admin/details/:id',
        component: InfoPosComponent,
      },
      // otras rutas que deben mostrarse dentro de PublicComponent
    ],
  },
  // otras rutas que deben mostrarse dentro de PublicComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionAdminRoutingModule {}


