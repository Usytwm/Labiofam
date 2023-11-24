import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Angular Material
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/Shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';


//componentes
import { ListPageComponent } from './page/list-page/list-page.component';
import { BioproductosComponent } from './components/bioproductos/bioproductos.component';
import { BioproductCardComponent } from './components/bioproduct-card/bioproduct-card.component';
import { BioproductPageComponent } from './page/bioproduct-page/bioproduct-page.component';

import { PrimeNgModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    ListPageComponent,BioproductosComponent,BioproductCardComponent, BioproductPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    //Prescindible
    SharedModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    PrimeNgModule,
    NgxPaginationModule,
  ]
})
export class BioproductosModule { }
