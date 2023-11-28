import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BioproductModuleModule } from '../components/bioproduct-module/bioproduct-module.module';

//Angular Material
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/Shared/shared.module';

import { NgxPaginationModule } from 'ngx-pagination';

//componentes
import { ListPageComponent } from './page/list-page/list-page.component';
import { BioproductosComponent } from './components/bioproductos/bioproductos.component';
import { BioproductCardComponent } from './components/bioproduct-card/bioproduct-card.component';
import { BioproductPageComponent } from './page/bioproduct-page/bioproduct-page.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AccordionModule } from 'primeng/accordion';
import { AccordionTab } from 'primeng/accordion';

@NgModule({
  declarations: [
    ListPageComponent,
    BioproductosComponent,
    BioproductCardComponent,
    BioproductPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BioproductModuleModule,
    //Prescindible
    SharedModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    AutoCompleteModule,
    NgxPaginationModule,

    AccordionModule,
  ],
})
export class BioproductosModule {}
