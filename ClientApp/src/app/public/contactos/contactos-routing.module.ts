import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListPageComponent } from './pages/contact-list-page/contact-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListPageComponent,
    children:[
      {path: 'contacto', component: ContactPageComponent },
      {path: 'list', component: ContactListPageComponent },
      {path: '**', redirectTo: 'list' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
