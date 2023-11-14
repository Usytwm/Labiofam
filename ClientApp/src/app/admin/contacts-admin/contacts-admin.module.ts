import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from 'src/app/Shared/shared.module';
//componentes
import { ContactsAdminComponent } from './components/contacts-admin/contacts-admin.component';
import { AddEditContactsComponent } from './components/add-edit-contacts/add-edit-contacts.component';



@NgModule({
  declarations: [
    ContactsAdminComponent,
    AddEditContactsComponent,
  ],
  imports: [
    CommonModule,
    CrudsModule,
    SharedModule,
    RouterModule,
  ]
})
export class ContactsAdminModule { }
