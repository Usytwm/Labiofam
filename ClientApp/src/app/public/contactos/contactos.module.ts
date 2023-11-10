import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//componentes
import { ContactosComponent } from './components/contactos/contactos.component';
import { ListPageComponent } from './page/list-page/list-page.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';

@NgModule({
  declarations: [ContactosComponent, ListPageComponent, ContactPageComponent,],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class ContactosModule {}
