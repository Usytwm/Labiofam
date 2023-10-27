import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/Interfaces/User';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { RegistrationService } from 'src/app/Services/registration.service';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent implements OnInit {
  _data: RegistrationModel[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _registrationervice: RegistrationService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this._registrationervice.getAll().subscribe((data) => {
      this._dataColumns = {
        id: 'id',
        nombre: 'userName',
        roles: 'roles',
      };
      this._data = data;
      this.loading = false;
    });
  }
  /* getAll(): void {
    this.loading = true;
    this._registrationervice.getAll().subscribe((users) => {
      // Crear una copia de los usuarios para no modificar los originales
      const usersWithRoles = [...users];
      // Iterar sobre cada usuario
      for (let user of usersWithRoles) {
        // Hacer una llamada a la base de datos para obtener los roles del usuario
        this.rolesService.getRoles(user.id).subscribe((roles) => {
          // Agregar la propiedad 'roles' al usuario
          user.roles = roles;
        });
      }
      this._dataColumns = {
        id: 'id',
        nombre: 'userName',
        roles: 'roles',
      };
      this._data = usersWithRoles;
      this.loading = false;
    });
  }*/

  Delete(id: string) {
    this.loading = true;
    this._registrationervice.delete(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
