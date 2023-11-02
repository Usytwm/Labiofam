import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styles: [
  ]
})
export class ContactListPageComponent  {
 /* public contacts: Contact[] = [];

  constructor( private contactService: ContactService) {}
  ngOnInit(): void {
    this.contactService.getAll()
      .subscribe( contacts => this.contacts = contacts)
  } */
}
