import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosRoutingModule } from './contactos-routing.module';
import { ContactosComponent } from './components/contactos/contactos.component';


@NgModule({
  declarations: [
    ContactosComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule
  ]
})
export class ContactosModule { }
