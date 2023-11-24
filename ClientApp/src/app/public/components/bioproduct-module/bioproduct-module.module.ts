import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BioproductCardComponent } from './bioproduct-card/bioproduct-card.component';
import { BioproductListComponent } from './bioproduct-list/bioproduct-list.component';

@NgModule({
  declarations: [BioproductCardComponent, BioproductListComponent],
  imports: [CommonModule, RouterModule],
  exports: [BioproductCardComponent,BioproductListComponent],
})
export class BioproductModuleModule {}
