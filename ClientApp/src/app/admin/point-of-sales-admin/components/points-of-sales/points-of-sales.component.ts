import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';

@Component({
  selector: 'app-points-of-sales',
  templateUrl: './points-of-sales.component.html',
  styleUrls: ['./points-of-sales.component.css'],
})
export class PointsOfSalesComponent implements OnInit {
  _data: Point_of_Sales[] = [];
  _dataColumns: Record<string, string> = {};
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
      this._dataColumns = {
        id: 'point_ID',
        nombre: 'name',
        direccion: 'address',
        municipio: 'municipality',
        provincia: 'province',
        latitud: 'latitude',
        longitud: 'longitude',
      };

      this._data = data;
      this.loading = false;
    });
  }

  Delete(id: string) {
    this.loading = true;
    console.log(id);
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
