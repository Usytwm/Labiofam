import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../../../../Services/EntitiesServices/services.service';
import { Service } from '../../../../Interfaces/Service';

@Component({
  selector: 'app-Service-edit',
  templateUrl: './Service-edit.component.html',
  styleUrls: ['./Service-edit.component.css'],
})
export class AddEditServiceComponent implements OnInit {
  loading = false;
  id: string;
  operacion = 'Agregar';
  service?: Service;
  form = this.fb.group({
    name: ['', Validators.required],
  });

  NameControl = new FormControl<string | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  _name?: '';

  InfoControl = new FormControl<string | null>(null, Validators.required);
  _info?: '';

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private snackBar: MatSnackBar,
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
    this.servicesService.get(id).subscribe((data) => {
      this.service = data;
      this.form.patchValue({ name: data.name });
      this.loading = false;
    });
  }

  editService() {
    this.loading = true;
    this.servicesService.edit(this.id, this.newService()).subscribe(() => {
      this.snackBar.open('Edit sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.newService());
      this.router.navigate(['/Services']);
    });
  }

  addService() {
    this.servicesService.add(this.newService()).subscribe((data) => {
      this.snackBar.open('Add sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      console.log(this.newService());
      this.router.navigate(['/Services']);
    });
  }

  newService(): Service {
    return {
      id: this.id,
      name: this.NameControl.value!,
      info: this.InfoControl.value!,
    };
  }
}
