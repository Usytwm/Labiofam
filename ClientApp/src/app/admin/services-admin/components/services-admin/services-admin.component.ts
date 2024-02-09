import { Component , ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

//Interfaces
import { Service } from 'src/app/Interfaces/Service';


//Servicios
import { ServicesService } from 'src/app/Services/EntitiesServices/services.service';

@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.css']
})

export class ServicesAdminComponent implements OnInit{

  _data: Service[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _serviceService: ServicesService,

  ) {}
  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.loading = true;
    this._serviceService.getAll().subscribe((data) => {
      this._dataColumns = {
        id: 'id',
        Nombre: 'name',
        Información: 'info'

      };
      this._data = data;
      this.loading = false;
    });
  }
  Delete(id: string) {
    this.loading = true;
    this._serviceService.remove(id).subscribe(() => {
      this._snackBar.open('Eliminado con éxito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
