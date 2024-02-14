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
import { Validators } from '@angular/forms';

//Interfaces

import { Testimonio } from 'src/app/Interfaces/Testimonios';

//Servicios

import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-add-edit-testimonios',
  templateUrl: './testimonios-edit.component.html',
  styleUrls: ['./testimonios-edit.component.css'],
})
export class AddEditTestimoniosComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  testimonio?: Testimonio;

  form = this.fb.group({
    enlace: ['', Validators.required],
    name: ['', Validators.required],
  });
  image?: string;
  imagePreview?: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _testimonioservice: TestimoniosService,
    private router: Router,
    private route: ActivatedRoute,
    private _fotoservice: FileService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

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
  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }
  getProduct(id: string) {
    this.loading = true;
    this._testimonioservice.get(id).subscribe((data) => {
      this.testimonio = data;
      console.log(data);
      this.form.patchValue({
        enlace: data.video_Url,
        name: data.name,
      });
      if (data.image) {
        this.getPhoto(data.image);
        this.imagePreview = data.image;
      }
      this.loading = false;
    });
  }
  addTestimonio() {
    this._testimonioservice.add(this.newTestimonio()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['/dashboard/testimonios-admin']);
    });
  }
  editTestimonio() {
    this.loading = true;
    this._testimonioservice
      .edit(this.id, this.newTestimonio())
      .subscribe(() => {
        this.snackBar.open('Editado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.loading = false;
        console.log(this.newTestimonio());
        this.router.navigate(['/dashboard/testimonios-admin']);
      });
  }
  newTestimonio(): Testimonio {
    const imagePath = this.imagePreview!;
    return {
      video_Url: this.form.value.enlace!,
      name: this.form.value.name!,
      image: imagePath,
    };
  }
}
