import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from './users-admin/components/users-admin/users-admin.component';
import { PointsOfSalesComponent } from './point-of-sales-admin/components/points-of-sales/points-of-sales.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddEditUserComponent } from './users-admin/components/add-edit-user/add-edit-user.component';
import { AddEditPosComponent } from './point-of-sales-admin/components/add-edit-pos/add-edit-pos.component';
import { ServicesAdminComponent } from './services-admin/components/services-admin/services-admin.component';
import { AddEditServiceComponent } from './services-admin/components/add-edit-service/Service-edit.component';
import { TestimoniosAdminComponent } from './testimonios-admin/components/testimonios-admin/testimonios-admin.component';
import { AddEditTestimoniosComponent } from './testimonios-admin/components/add-edit-testimonios/testimonios-edit.component';

import { BioproductsAdminComponent } from './bioproducts-admin/components/bioproducts-admin/bioproducts-admin.component';
import { AddEditBioproductComponent } from './bioproducts-admin/components/add-edit-bioproduct/add-edit-bioproduct.component';
import { ContactsAdminComponent } from './contacts-admin/components/contacts-admin/contacts-admin.component';
import { AddEditContactsComponent } from './contacts-admin/components/add-edit-contacts/add-edit-contacts.component';
import { roleGuard } from '../Guards/administrations.guard';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'home',
        component: HomeAdminComponent,
      },
      {
        path: 'users-admin',
        component: UsersAdminComponent,
      },
      { path: 'users-admin/edit/:id', component: AddEditUserComponent },
      { path: 'users-admin/add', component: AddEditUserComponent },
      { path: 'services-admin', component: ServicesAdminComponent },
      { path: 'services-admin/edit/:id', component: AddEditServiceComponent },
      { path: 'services-admin/add', component: AddEditServiceComponent },
      { path: 'testimonios-admin', component: TestimoniosAdminComponent },
      {
        path: 'testimonios-admin/edit/:id',
        component: AddEditTestimoniosComponent,
      },
      { path: 'testimonios-admin/add', component: AddEditTestimoniosComponent },

      { path: 'bioproducts-admin', component: BioproductsAdminComponent },
      {
        path: 'bioproducts-admin/edit/:id',
        component: AddEditBioproductComponent,
      },
      { path: 'bioproducts-admin/add', component: AddEditBioproductComponent },

      { path: 'contacts-admin', component: ContactsAdminComponent },
      { path: 'contacts-admin/edit/:id', component: AddEditContactsComponent },
      { path: 'contacts-admin/add', component: AddEditContactsComponent },

      {
        path: 'points-of-sales-admin',
        component: PointsOfSalesComponent,
      },
      {
        path: 'points-of-sales-admin/edit/:id',
        component: AddEditPosComponent,
      },
      { path: 'points-of-sales-admin/add', component: AddEditPosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionAdminRoutingModule {}
