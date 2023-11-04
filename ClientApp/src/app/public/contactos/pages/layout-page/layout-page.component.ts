import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/contact.service';
@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit {
  public contacts: Contact[] = [];

  constructor( private contactService: ContactService) {}
  ngOnInit(): void {
    this.contactService.getAll()
      .subscribe( contacts => this.contacts = contacts)
  }
}
