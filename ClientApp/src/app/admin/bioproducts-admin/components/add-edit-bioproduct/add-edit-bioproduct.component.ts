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

//Interfaces

import { Product } from 'src/app/Interfaces/Product';

//Servicios

import { ProductService } from 'src/app/Services/EntitiesServices/product.service';


@Component({
  selector: 'app-add-edit-bioproduct',
  templateUrl: './add-edit-bioproduct.component.html',
  styleUrls: ['./add-edit-bioproduct.component.css']
})
export class AddEditBioproductComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  product?: Product;

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    summary: ['', Validators.required],
    specifications: ['', Validators.required],

  });


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
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
      this.loading = false;
    });
  }
  addProduct() {
    this._productservice.add(this.newProduct()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      //console.log(this.newUser());
      this.router.navigate(['/dashboard/bioproducts-admin']);
    });
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
    return {

      name: this.form.value.name!,
      type: this.form.value.type!,
      summary: this.form.value.summary!,
      specifications: this.form.value.specifications!,
    }
  }
}
