import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { GenericTableModule } from '../generic-table/generic-table.module';
import { SharedModule } from '../../Shared/shared.module';
//componentes
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [UsersAdminComponent, AddEditUserComponent],
  imports: [CommonModule, GenericTableModule, SharedModule, RouterModule],
})
export class UsersadminModule {}
