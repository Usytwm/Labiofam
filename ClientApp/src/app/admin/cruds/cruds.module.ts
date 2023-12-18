import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//componentes
import { GenericTableComponent } from './table/generic-table.component';

//modulos Material
import { SharedModule } from '../../Shared/shared.module';
import { AddEditGenericComponent } from './add-edit/add-edit-generic.component';

@NgModule({
  declarations: [GenericTableComponent, AddEditGenericComponent],
  imports: [CommonModule, RouterModule, SharedModule, FontAwesomeModule],
  exports: [GenericTableComponent],
})
export class CrudsModule {}
