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

  form = this.fb.group({
    name: ['', Validators.required],
    info: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _serviceservice: ServicesService,
    private router: Router,
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
    return {
      name: this.form.value.name!,
      info: this.form.value.info!,
    }
  }
}
