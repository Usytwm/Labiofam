import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../../../../Interfaces/Contact';
import { ContactService } from '../../../../Services/EntitiesServices/contact.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-add-edit-contacts',
  templateUrl: './add-edit-contacts.component.html',
  styleUrls: ['./add-edit-contacts.component.css'],
})
export class AddEditContactsComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  contacto?: Contact;

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const imagename = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
    }
  }
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this._fotoservice.uploadPhoto(file).subscribe((response) => {
        // Maneja la respuesta del servidor aquí
        this.imagePreview = response;
        this.getPhoto(this.imagePreview);
      });
    }
  }

  getPhoto(photoName: string) {
    this._fotoservice.getPhoto(photoName).subscribe((photo) => {
      // console.log(photo);
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  image?: string;
  imagePreview?: string;

  form = this.fb.group({
    name: ['', Validators.required],
    occupation: ['', Validators.required],
    info: [''],
  });

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private _fotoservice: FileService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getContact(this.id);
    }
  }

  getContact(id: string) {
    this.loading = true;
    this.contactService.get(id).subscribe((data) => {
      this.contacto = data;
      console.log(data);
      this.form.patchValue({
        name: data.name,
        occupation: data.occupation,
        info: data.contact_Info,
        //image: data.image,
      });
      if (data.image) {
        this.getPhoto(data.image);
      }
      this.loading = false;
    });
  }

  editContact() {
    this.loading = true;
    this.contactService.edit(this.id, this.newContact()).subscribe(() => {
      this.snackBar.open('Editado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.newContact());
      this.router.navigate(['/dashboard/contacts-admin']);
    });
  }

  addContact() {
    console.log(this.newContact());

    this.contactService.add(this.newContact()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });

      this.router.navigate(['/dashboard/contacts-admin']);
    });
  }

  newContact(): Contact {
    const imagePath = this.imagePreview!;
    return {
      name: this.form.value.name!,
      occupation: this.form.value.occupation!,
      contact_Info: this.form.value.info!,
      image: imagePath,
    };
  }
}
