import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { GenericTableCrudComponent } from 'src/app/generic-cruds/generic-table-crud/generic-table-crud.component';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';
import { TableColumn } from 'src/app/generic-cruds/table-column';
import { AbstractService } from 'src/app/Services/generic-crud.service';
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-home-points-of-sales',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  _data: Point_of_Sales[] = [];
  _dataColumns: string[] = [];
  loading: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _service: PointsOfSalesService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this._service.getAll().subscribe((data) => {
      this._dataColumns = [
        'name',
        'address',
        'municipality',
        'province',
        'latitude',
        'longitude',
      ];

      this._data = data;
      this.loading = false;
    });
  }

  Delete(id: string) {
    this.loading = true;
    this._service.delete(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
