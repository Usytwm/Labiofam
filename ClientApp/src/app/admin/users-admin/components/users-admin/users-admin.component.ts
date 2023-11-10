import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/Interfaces/User';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { FilterService } from 'src/app/Services/filter.service';
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
    private _registrationervice: RegistrationService,
    private _filter: FilterService
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
      this._data = data.map((item) => ({
        ...item,
        roles: 'knjsn',
      }));
      this.loading = false;
    });
  }

  Delete(id: string) {
    this.loading = true;
    this._registrationervice.delete(id).subscribe(() => {
      this._snackBar.open('Eliminado con éxito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
