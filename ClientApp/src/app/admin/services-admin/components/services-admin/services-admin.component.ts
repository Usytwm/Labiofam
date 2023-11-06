import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Service } from './../../../../Interfaces/Service';
import { RegistrationModel } from './../../../../Interfaces/registration-model';
import { RegistrationService } from './../../../../Services/registration.service';
@Component({
  selector: 'app-service-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.css'],
})
export class ServicesAdminComponent implements OnInit {
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
        name: 'Name',
        info: 'Info',
      };
      this._data = data;
      this.loading = false;
    });
  }


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