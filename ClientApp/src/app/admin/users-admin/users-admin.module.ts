import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { GenericTableModule } from '../generic-table/generic-table.module';
//componentes
import { UsersAdminComponent } from './components/users-admin/users-admin.component';

@NgModule({
  declarations: [UsersAdminComponent],
  imports: [CommonModule, GenericTableModule],
})
export class UsersadminModule {}
