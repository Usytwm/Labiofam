import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//componentes
import { GenericTableComponent } from './generic-table/generic-table.component';

//modulos Material
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
