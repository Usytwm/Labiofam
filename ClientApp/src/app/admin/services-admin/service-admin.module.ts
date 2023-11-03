import { Service } from '../../Interfaces/Service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';
//componentes
import { ServicesAdminComponent } from './components/services-admin/services-admin.component';
import { AddEditServiceComponent } from './components/add-edit-service/Service-edit.component';

@NgModule({
  declarations: [ServicesAdminComponent, AddEditServiceComponent],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule],
})
export class ServicesAdminModule {}

