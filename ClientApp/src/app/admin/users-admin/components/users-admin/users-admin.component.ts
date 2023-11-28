import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { forkJoin, map } from 'rxjs';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { UserRoleFilterService } from 'src/app/Services/FilterServices/user-roles-filter.service';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _registrationervice: RegistrationService,
    private _filter:UserRoleFilterService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this._registrationervice.getAll().subscribe((users) => {
      // Crear un array de observables para cada usuario
      const observables = users.map((user) =>
        this._filter.getType1byType2(user.id!).pipe(
          map((roles) => ({
            ...user,
            roles: roles.map(x=>x.name).join(', '), // Aquí se agregan los roles al usuario
          }))
        )
      );
    
      // Utilizar forkJoin para esperar a que todos los observables se completen
      forkJoin(observables).subscribe((data) => {
        this._dataColumns = {
          id: 'id',
          nombre: 'userName',
          roles: 'roles',
        };
        this._data = data; // Ahora data contiene los usuarios con sus roles
        this.loading = false;
      });
    });
    
  }

  Delete(id: string) {
    this.loading = true;
    this._registrationervice.remove(id).subscribe(() => {
      this._snackBar.open('Eliminado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
