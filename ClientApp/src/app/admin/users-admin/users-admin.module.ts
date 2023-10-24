import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { UsersadminRoutingModule } from './users-admin-routing.module';
import { GenericTableModule } from '../generic-table/generic-table.module';
//componentes
import { UsersAdminComponent } from './components/users-admin/users-admin.component';

@NgModule({
  declarations: [UsersAdminComponent],
  imports: [CommonModule, UsersadminRoutingModule, GenericTableModule],
})
export class UsersadminModule {}
