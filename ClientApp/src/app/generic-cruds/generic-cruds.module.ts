import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericCrudsRoutingModule } from './generic-cruds-routing.module';
import { SharedModule } from '../Shared/shared.module';

import { GenericCreateCrudComponent } from './generic-create-crud/generic-create-crud.component';
import { GenericDetailsCrudComponent } from './generic-details-crud/generic-details-crud.component';
import { GenericTableCrudComponent } from './generic-table-crud/generic-table-crud.component';

@NgModule({
  declarations: [
    GenericCreateCrudComponent,
    GenericDetailsCrudComponent,
    GenericTableCrudComponent,
  ],
  imports: [CommonModule, GenericCrudsRoutingModule, SharedModule],
  exports: [
    GenericCreateCrudComponent,
    GenericDetailsCrudComponent,
    GenericTableCrudComponent,
  ],
})
export class GenericCrudsModule {}
