import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { ContactosComponent } from './components/contactos/contactos.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListPageComponent } from './pages/contact-list-page/contact-list-page.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactosComponent,
    children:[
      {path: 'list', component: ContactPageComponent },
      {path: ':contact_ID', component: ContactListPageComponent },
      {path: '**', redirectTo: 'list' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
