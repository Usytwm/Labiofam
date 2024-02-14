import { Component } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/EntitiesServices/contact.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent {
  loading: Boolean = false;
  contactos: Contact[] = [];
  imageUrls: { [key: string]: string } = {};

  constructor(
    private _contactsservices: ContactService,
    private _photoservice: FileService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.obtenerContactos();
  }

  obtenerContactos() {
    this.loading = true;
    this._contactsservices.getAll().subscribe((data) => {
      this.contactos = data;

      this.contactos.forEach((contacto) => {
        if (contacto.image) {
          this._photoservice.getPhoto(contacto.image).subscribe((photo) => {
            photo.text().then((text) => {
              this.imageUrls[contacto.id!] =
                'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
            });
          });
        }
      });
      console.log(data);
      this.loading = false;
    });
  }
}
