import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { SeccionAdminRoutingModule } from './seccion-admin-routing.module';
import { PointOfSalesAdminModule } from './point-of-sales-admin/point-of-sales-admin.module';
import { UsersadminModule } from './users-admin/users-admin.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeccionAdminRoutingModule,
    PointOfSalesAdminModule,
    UsersadminModule,
  ],
})
export class SeccionAdminModule {}
