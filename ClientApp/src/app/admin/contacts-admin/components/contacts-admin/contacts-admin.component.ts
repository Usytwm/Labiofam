import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Contact } from 'src/app/Interfaces/Contact';
import { ContactService } from 'src/app/Services/EntitiesServices/contact.service';

@Component({
  selector: 'app-contacts-admin',
  templateUrl: './contacts-admin.component.html',
  styleUrls: ['./contacts-admin.component.css'],
})
export class ContactsAdminComponent {
  _data: Contact[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _contactservice: ContactService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this._contactservice.getAll().subscribe((data) => {
      this._dataColumns = {
        id: 'id',
        Nombre: 'name',
        Ocupación: 'occupation',
        Correo: 'email',
        Teléfono: 'phone',
      };
      this._data = data;
      this.loading = false;
    });
  }

  Delete(id: string) {
    this.loading = true;
    this._contactservice.remove(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
