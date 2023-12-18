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

import { Testimonio } from 'src/app/Interfaces/Testimonios';

//Servicios

import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';


@Component({
  selector: 'app-add-edit-testimonios',
  templateUrl: './testimonios-edit.component.html',
  styleUrls: ['./testimonios-edit.component.css']
})
export class AddEditTestimoniosComponent {
  loading = false;
  id: string;
  operacion = 'Agregar';
  testimonio?: Testimonio;

  form = this.fb.group({
    enlace: ['', Validators.required],
    titulo: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _testimonioservice: TestimoniosService,
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
    this._testimonioservice.get(id).subscribe((data) => {
      this.testimonio = data;
      console.log(data);
      this.form.patchValue({
        enlace: data.enlace,
        titulo: data.titulo,
      });
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
    this._testimonioservice.edit(this.id, this.newTestimonio()).subscribe(() => {
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
    return {
      enlace: this.form.value.enlace!,
      titulo: this.form.value.titulo!,
    }
  }
}
