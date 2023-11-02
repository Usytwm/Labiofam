import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosComponent } from './components/contactos/contactos.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListPageComponent } from './pages/contact-list-page/contact-list-page.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactosRoutingModule } from './contactos-routing.module';
import { ContactImagePipe } from './pipes/contactos-image.pipes';


@NgModule({
  declarations: [
    ContactosComponent,
    ContactPageComponent,
    ContactListPageComponent,
    ContactCardComponent,
    //Pipes

     ContactImagePipe,
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,

  ],
})
export class ContactosModule {}
