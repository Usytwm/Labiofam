import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/Interfaces/Role';
import { UserService } from 'src/app/Services/user.service';
import { RolesService } from 'src/app/Services/roles.service';
import { User_Role } from 'src/app/Interfaces/User_Role';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { RegistrationService } from 'src/app/Services/registration.service';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
@Component({
  selector: 'app-add-edit-pos',
  templateUrl: './add-edit-pos.component.html',
  styleUrls: ['./add-edit-pos.component.css'],
})
export class AddEditPosComponent implements OnInit {
  loading = false;
  id: string;
  operacion = 'Agregar';
  point?: Point_of_Sales;

  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    municipality: ['', Validators.required],
    province: ['', Validators.required],
    latitude: [
      0,
      [
        Validators.required,
        Validators.pattern(
          '^[-+]?((?:180(?:\\.0+)?|(?:(?:1[0-7]\\d)|(?:[1-9]?\\d))(?:\\.\\d+)?))'
        ),
      ],
    ],
    longitude: [
      0,
      [
        Validators.required,
        Validators.pattern(
          '^[-+]?((?:180(?:\\.0+)?|(?:(?:1[0-7]\\d)|(?:[1-9]?\\d))(?:\\.\\d+)?))'
        ),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _point_of_sales_service: PointsOfSalesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getPoint(this.id);
    }
  }

  getPoint(id: string) {
    this.loading = true;
    this._point_of_sales_service.get(id).subscribe((data) => {
      this.point = data;
      console.log(data);
      this.form.patchValue({
        name: data.name,
        address: data.address,
        municipality: data.municipality,
        province: data.province,
        latitude: data.latitude,
        longitude: data.longitude,
      });
      this.loading = false;
    });
  }

  editPoint() {
    this.loading = true;
    console.log(this.newPoint());
    this._point_of_sales_service
      .update(this.id, this.newPoint())
      .subscribe(() => {
        this.snackBar.open('Edit sucess', '', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.loading = false;
        this.router.navigate(['/dashboard/points-of-sales']);
      });
  }

  addPoint() {
    this._point_of_sales_service.add(this.newPoint()).subscribe((data) => {
      this.snackBar.open('Add sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      //console.log(this.newUser());
      this.router.navigate(['/dashboard/points-of-sales']);
    });
  }

  newPoint(): Point_of_Sales {
    return {
      name: this.form.value.name!,
      address: this.form.value.address!,
      municipality: this.form.value.municipality!,
      province: this.form.value.province!,
      latitude: this.form.value.latitude!,
      longitude: this.form.value.longitude!,
    };
  }
}
