import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/EntitiesServices/contact.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
//import { blob } from 'stream/consumers';

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
  private foto?: File;
  imagePreview?: string;

  form = this.fb.group({
    name: ['', Validators.required],
    occupation: ['', Validators.required],
    info: ['', Validators.required],

  });

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getContact(this.id);
    }
  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
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
    const imageName = this.imagePreview?.split('/').pop();
    const imagePath = imageName ? `assets/${imageName}` : '';
    return {
      name: this.form.value.name!,
      occupation: this.form.value.occupation!,
      contact_Info: this.form.value.info!,
      image: imagePath,
    };
  }






}
/*
  upPhoto() {
    if (this.contacto && this.imagePreview) {
      const randomFilename = `${Math.random().toString(36).substr(2, 9)}.jpg`;
      this.contactService
        .UploadPhoto(this.imagePreview, this.contacto.id, randomFilename)
        .subscribe((contacto: Contact) => {
          this.contacto = contacto;
          Swal.fire('La foto se ha subido con éxito');
        });
    } else if (!this.contacto) {
      Swal.fire('Error', 'No se ha encontrado el contacto', 'error');
    } else if (!this.imagePreview) {
      Swal.fire('Error', 'No se ha seleccionado una foto', 'error');
    }
  }
  capturarFile(event): any {
    const archivos = event.target.files[0]
    this.extraerBase64(archivos).then(imagen => {
      this
      console.log(imagen);
    })
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base:reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob:$event,
          image,
          base:null
        });
      };

    } catch (e) {
        return null;
    }
  })
 }





  */


 /*
  newContact(): Contact {
    return {
      name: this.form.value.name!,
      occupation: this.form.value.occupation!,
      contact_Info: this.form.value.info!,
      image: this.imagePreview || 'https://picsum.photos/200/300', // Use a default image if no image is selected
    };
  }
  */
 /*
  onFileSelected(event: Event){
    this.foto = event.target.files[0]
    console.log(this.foto);
  }
  subirFoto(){
    this.contactService.upPhoto(this.foto, this.contacto.id).subscribe(this.contacto => {
      this.contacto = contacto;
      Swal('foto!',)
    });
  }
  */



  /*
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
    }
  }
  */
  /*
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageBase64 = reader.result as string;

        // Save the image to the '/assets' folder
        const filename = `${Math.random().toString(36).substr(2, 9)}.jpg`; // Generate a random filename
        const imagePath = `/assets/${filename}`;

        // Use fs (file system) module to write the image data to the specified path
        const fs = require('fs');
        fs.writeFileSync(imagePath, imageBase64, 'base64');

        // Display a success message
        Swal.fire('Image Uploaded Successfully', `The image ${filename} has been uploaded to the assets folder.`, 'success');

        // Update the image preview with the base64 data
        this.imagePreview = imageBase64;
      };
    }
  }
  */
