import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from './users-admin/components/users-admin/users-admin.component';
import { PointsOfSalesComponent } from './point-of-sales-admin/components/points-of-sales/points-of-sales.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddEditUserComponent } from './users-admin/components/add-edit-user/add-edit-user.component';
import { AddEditPosComponent } from './point-of-sales-admin/components/add-edit-pos/add-edit-pos.component';
import { ServicesAdminComponent } from './services-admin/components/services-admin/services-admin.component';
import { AddEditServiceComponent } from './services-admin/components/add-edit-service/Service-edit.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SidenavComponent,
    children: [
      { path: 'users', component: UsersAdminComponent },
      { path: 'users/edit/:id', component: AddEditUserComponent },
      { path: 'users/add', component: AddEditUserComponent },
      { path: 'services', component: ServicesAdminComponent },
      { path: 'services/edit/:id', component: AddEditServiceComponent },
      { path: 'services/add', component: AddEditServiceComponent },
      {
        path: 'points-of-sales',
        component: PointsOfSalesComponent,
      },
      { path: 'points-of-sales/edit/:id', component: AddEditPosComponent },
      { path: 'points-of-sales/add', component: AddEditPosComponent },
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
