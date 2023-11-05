import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioproductosRoutingModule } from './bioproduct-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { BioproductosComponent } from './components/bioproductos/bioproductos.component';
import { CardComponent } from './components/card/card.component';
import { BioproductPageComponent } from './pages/bioproduct-page/bioproduct-page.component';


import { SharedModule } from 'src/app/Shared/shared.module';
import { BioProductImagePipe } from './pipes/bioproductos-image.pipes';

@NgModule({
  declarations: [
    BioproductosComponent,
    ListPageComponent,
    BioproductPageComponent,
    CardComponent,
    //Pipes
    BioProductImagePipe,


  ],
  imports: [
    CommonModule,
    BioproductosRoutingModule,
    SharedModule,

  ]
})
export class BioproductosModule { }
