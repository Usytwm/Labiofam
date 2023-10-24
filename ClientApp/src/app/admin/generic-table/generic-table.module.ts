import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericTableComponent } from './generic-table/generic-table.component';

//material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
