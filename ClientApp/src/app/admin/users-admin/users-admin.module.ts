import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//componentes
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [UsersAdminComponent, AddEditUserComponent],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule, NgbModule],
})
export class UsersadminModule {}
