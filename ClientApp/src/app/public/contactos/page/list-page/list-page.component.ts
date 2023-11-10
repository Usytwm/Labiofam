import { Component } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/EntitiesServices/contact.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {
  loading: Boolean = false;
  contactos: Contact[] = [];
  constructor(
    private _contactsservices: ContactService
  ) { }
  ngOnInit(): void {
    this.obtenerContactos();
  }
  obtenerContactos() {
    this.loading = true;
    this._contactsservices.getAll().subscribe((data) => {
      this.contactos = data;
      console.log(data);
      this.loading = false;
    });
  }
}

