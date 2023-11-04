import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';
//componentes
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { InfoUserComponent } from './components/info-user/info-user.component';

@NgModule({
  declarations: [UsersAdminComponent, AddEditUserComponent, InfoUserComponent],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule],
})
export class UsersadminModule {}
