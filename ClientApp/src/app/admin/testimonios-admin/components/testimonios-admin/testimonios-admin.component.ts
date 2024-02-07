import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

//Interfaces
import { Testimonio } from 'src/app/Interfaces/Testimonios';

//Servicios
import { TestimoniosService } from 'src/app/Services/EntitiesServices/testimonios.service';

@Component({
  selector: 'app-testimonios-admin',
  templateUrl: './testimonios-admin.component.html',
  styleUrls: ['./testimonios-admin.component.css'],
})
export class TestimoniosAdminComponent implements OnInit {
  _data: Testimonio[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _testimoniosService: TestimoniosService
  ) {}
  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.loading = true;
    this._testimoniosService.getAll().subscribe((data) => {
      this._dataColumns = {
        id: 'id',
        nombre: 'name',
        enlace: 'video_Url',
      };
      this._data = data;
      this.loading = false;
    });
  }
  Delete(id: string) {
    this.loading = true;
    this._testimoniosService.remove(id).subscribe(() => {
      this._snackBar.open('Eliminado con éxito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
