import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/EntitiesServices/contact.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-edit-contacts',
  templateUrl: './add-edit-contacts.component.html',
  styleUrls: ['./add-edit-contacts.component.css']
})
export class AddEditContactsComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  contacto?: Contact;
  private foto?: File;
  form = this.fb.group({
    name: ['', Validators.required],
    occupation: ['', Validators.required],
    info: ['', Validators.required],
    image: ['',Validators.required],

  });

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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
        occupation : data.occupation,
        info: data.contact_Info,
        image: data.image,
      });
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
    return {
      name: this.form.value.name!,
      occupation: this.form.value.occupation!,
      contact_Info: this.form.value.info!,
      image: this.form.value.image!,
    };
  }

}
