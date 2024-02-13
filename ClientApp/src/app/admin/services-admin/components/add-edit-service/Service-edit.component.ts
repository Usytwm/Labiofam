import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
//import {} from '@angular/cdk';
//Interfaces

import { Service } from 'src/app/Interfaces/Service';

//Servicios

import { ServicesService } from 'src/app/Services/EntitiesServices/services.service';
import { FileService } from 'src/app/Services/FilesService/File.service';


@Component({
  selector: 'app-add-edit-service',
  templateUrl: './Service-edit.component.html',
  styleUrls: ['./Service-edit.component.css']
})
export class AddEditServiceComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  service?: Service;
  image?: string;
  imagePreview?: string;

  form = this.fb.group({
    name: ['', Validators.required],
    info: ['', Validators.required],
  });

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
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _serviceservice: ServicesService,
    private router: Router,
    private _fotoservice: FileService,
    private route: ActivatedRoute
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getService(this.id);
    }
  }
  getService(id: string) {
    this.loading = true;
    this._serviceservice.get(id).subscribe((data) => {
      this.service = data;
      console.log(data);
      this.form.patchValue({
        name: data.name,
        info: data.info,

      });
      if (data.image) {
        this.getPhoto(data.image);
        this.imagePreview = data.image;
      }
      this.loading = false;
    });
  }
  addService() {
    this._serviceservice.add(this.newService()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['/dashboard/services-admin']);
    });
  }
  editService() {
    this.loading = true;
    this._serviceservice.edit(this.id, this.newService()).subscribe(() => {
      this.snackBar.open('Editado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.newService());
      this.router.navigate(['/dashboard/services-admin']);
    });
  }
  newService(): Service {
    console.log(this.imagePreview);
    return {
      name: this.form.value.name!,
      info: this.form.value.info!,
      image:this.imagePreview!,


    }
  }
}
