import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioproductosRoutingModule } from './bioproduct-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { BioproductosComponent } from './components/bioproductos/bioproductos.component';
import { CardComponent } from './components/card/card.component';
import { BioProductImagePipe } from './pipes/bioproductos-image.pipes';
import { BioproductPageComponent } from './pages/bioproduct-page/bioproduct-page.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [
    ListPageComponent,
    BioproductosComponent,
    CardComponent,
    //Pipes
    BioProductImagePipe,
    BioproductPageComponent,
    LayoutPageComponent,
  ],
  imports: [
    CommonModule,
    BioproductosRoutingModule,
    SharedModule,
  ]
})
export class BioproductosModule { }
