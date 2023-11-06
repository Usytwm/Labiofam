import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//componentes
import { GenericTableComponent } from './table/generic-table.component';

//modulos Material
import { SharedModule } from '../../Shared/shared.module';
import { AddEditGenericComponent } from './add-edit/add-edit-generic.component';

@NgModule({
  declarations: [GenericTableComponent, AddEditGenericComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [GenericTableComponent],
})
export class CrudsModule {}
