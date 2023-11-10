import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';
//componentes
import { BioproductsAdminComponent } from './components/bioproducts-admin/bioproducts-admin.component';
import { AddEditBioproductComponent } from './components/add-edit-bioproduct/add-edit-bioproduct.component';


@NgModule({
  declarations: [BioproductsAdminComponent,AddEditBioproductComponent,],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule],
})
export class BioproductadminModule {}
