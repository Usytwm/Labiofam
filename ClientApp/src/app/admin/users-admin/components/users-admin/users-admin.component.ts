import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { forkJoin, map } from 'rxjs';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { UserRoleFilterService } from 'src/app/Services/FilterServices/user-roles-filter.service';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { RegistrationService } from 'src/app/Services/RegistrationsService/registration.service';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent implements OnInit {
  _data: RegistrationModel[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;
  data!: RegistrationRequestModel;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _registrationervice: RegistrationService,
    private _filter: UserRoleFilterService,
    private _auhtservice: AuthService
  ) {}

  ngOnInit() {
    this.getAll();
    this.getData();
  }

  getData() {
    const token = this._auhtservice.getToken();
    if (token != null)
      this._auhtservice.getData(token).subscribe((datos) => {
        this.data = datos;
      });
  }

  getAll(): void {
    this.loading = true;
    this._registrationervice.getAll().subscribe((users) => {
      // Crear un array de observables para cada usuario
      const observables = users.map((user) =>
        this._filter.getType1byType2(user.id!).pipe(
          map((roles) => ({
            ...user,
            roles: roles.map((x) => x.name).join(', '), // Aquí se agregan los roles al usuario
          }))
        )
      );

      // Utilizar forkJoin para esperar a que todos los observables se completen
      forkJoin(observables).subscribe((data) => {
        this._dataColumns = {
          id: 'id',
          Nombre: 'userName',
          Roles: 'roles',
          Correo: 'email',
        };
        this._data = data; // Ahora data contiene los usuarios con sus roles
        this.loading = false;
      });
    });
  }

  Delete(id: string) {
    this.loading = true;
    if (this._data.length == 1) {
      this._snackBar.open('Al menos debe haber un usuario', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: ['custom-snackbar'],
      });
    } else if (this.data.user!.id == id) {
      this._snackBar.open('No puedes eliminar tu propio usuario', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: ['custom-snackbar'],
      });
    } else {
      console.log(id);

      this._registrationervice.remove(id).subscribe(() => {
        this._snackBar.open('Eliminado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: ['custom-snackbar'],
        });
        this.loading = false;
        this.getAll();
      });
    }
  }
}
