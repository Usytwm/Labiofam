import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { SeccionAdminRoutingModule } from './admin-routing.module';
import { PointOfSalesAdminModule } from './point-of-sales-admin/point-of-sales-admin.module';
import { UsersadminModule } from './users-admin/users-admin.module';
import { ServicesAdminModule } from './services-admin/service-admin.module';

//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../Shared/shared.module';
//componentes
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SeccionAdminRoutingModule,
    PointOfSalesAdminModule,
    UsersadminModule,
    MatSidenavModule,
    SharedModule,
    ServicesAdminModule,
  ],
})
export class SeccionAdminModule {}
