import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BioproductCardComponent } from './bioproduct-card/bioproduct-card.component';
import { BioproductListComponent } from './bioproduct-list/bioproduct-list.component';
import { BioprductCardsPlaceholderComponent } from './bioprduct-cards-placeholder/bioprduct-cards-placeholder.component';

@NgModule({
  declarations: [
    BioproductCardComponent,
    BioproductListComponent,
    BioprductCardsPlaceholderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BioproductCardComponent,
    BioproductListComponent,
    BioprductCardsPlaceholderComponent,
  ],
})
export class BioproductModuleModule {}
