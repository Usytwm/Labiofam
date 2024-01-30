import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormArray } from '@angular/forms';
//Interfaces

import { Product } from 'src/app/Interfaces/Product';

//Servicios

import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-add-edit-bioproduct',
  templateUrl: './add-edit-bioproduct.component.html',
  styleUrls: ['./add-edit-bioproduct.component.css'],
})
export class AddEditBioproductComponent {
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
      console.log(photo);
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  image?: string;
  imagePreview?: string;
  loading = false;
  id: string;
  operacion = 'Agregar';
  product?: Product;
  extrasForm?: FormGroup;
  form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    summary: ['', Validators.required],
    specifications: ['', Validators.required],
    extras: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _fotoservice: FileService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }

  get extras() {
    return this.form.controls['extras'] as FormArray;
  }
  addExtras() {
    this.extrasForm = this.fb.group({
      nameC: ['', Validators.required],
      InfoC: ['', Validators.required],
    });
    this.extras.push(this.extrasForm);
  }
  deleteExtras(extraIndex: number) {
    this.extras.removeAt(extraIndex);
  }

  getProduct(id: string) {
    this.loading = true;
    this._productservice.get(id).subscribe((data) => {
      this.product = data;
      console.log(data);
      this.form.patchValue({
        name: data.name,
        summary: data.summary,
        type: data.type,
        specifications: data.specifications,
      });
      if (data.image) {
        this.getPhoto(data.image);
      }
      this.loading = false;
    });
  }
  /*
  addProduct() {
    this._productservice.add(this.newProduct()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      //console.log(this.newUser());
      this.router.navigate(['/dashboard/bioproducts-admin']);
    });
  }*/
  addProduct() {
    this._productservice.add(this.newProduct()).subscribe(
      (data) => {
        this.snackBar.open('Agregado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.router.navigate(['/dashboard/bioproducts-admin']);
      },
      (error) => {
        if (error.error.code === 'DUPLICATE_PRODUCT_NAME') {
          this.snackBar.open('El nombre del producto ya existe', 'cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
          });
        } else {
          console.error(error);
          this.snackBar.open(
            'Ha ocurrido un error al agregar el producto',
            'cerrar',
            {
              duration: 3000,
              horizontalPosition: 'right',
            }
          );
        }
      }
    );
  }
  editProduct() {
    this.loading = true;
    this._productservice.edit(this.id, this.newProduct()).subscribe(() => {
      this.snackBar.open('Editado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.newProduct());
      this.router.navigate(['/dashboard/bioproducts-admin']);
    });
  }
  newProduct(): Product {
    const imagePath = this.imagePreview!;
    return {
      name: this.form.value.name!,
      type: this.form.value.type!,
      summary: this.form.value.summary!,
      specifications: this.form.value.specifications!,
      image: imagePath,
    };
  }
}
