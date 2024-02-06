import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
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

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    type_of_Product: ['', Validators.required],
    advantages: [''],
    diseases: [''],
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

  summary: Record<string, string> = {};
  showForm = false;
  newKey = '';
  newValue = '';

  addPair() {
    if (this.newKey && this.newValue) {
      console.log(this.newKey);

      this.summary[this.newKey] = this.newValue;
      this.newKey = '';
      this.newValue = '';
      this.showForm = false;
    }
    console.log(this.summary);
  }

  deletePair(key: string) {
    delete this.summary[key];
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  getProduct(id: string) {
    this.loading = true;
    this._productservice.get(id).subscribe((data) => {
      this.product = data;
      console.log(data);
      this.form.patchValue({
        name: data.name,
        description: data.description,
        advantages: data.advantages,
        type_of_Product: data.type_of_Product,
        diseases: data.diseases,
      });
      if (data.image) {
        this.getPhoto(data.image);
      }
      if (data.summary) {
        this.summary = data.summary;
      }
      this.loading = false;
    });
  }
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
      type_of_Product: this.form.value.type_of_Product!,
      summary: this.summary,
      diseases: this.form.value.diseases!,
      image: imagePath,
      description: this.form.value.description!,
      advantages: this.form.value.advantages!,
    };
  }
  objectKeys(summary: Record<string, string>) {
    return Object.keys(summary);
  }
}
