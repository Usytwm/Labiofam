import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { SeccionAdminRoutingModule } from './admin-routing.module';
import { PointOfSalesAdminModule } from './point-of-sales-admin/point-of-sales-admin.module';
import { UsersadminModule } from './users-admin/users-admin.module';

//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../Shared/shared.module';
//componentes
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BioproductsAdminComponent } from './bioproducts-admin/bioproducts-admin.component';

@NgModule({
  declarations: [SidenavComponent, BioproductsAdminComponent],
  imports: [
    CommonModule,
    SeccionAdminRoutingModule,
    PointOfSalesAdminModule,
    UsersadminModule,
    MatSidenavModule,
    SharedModule,
  ],
})
export class SeccionAdminModule {}
