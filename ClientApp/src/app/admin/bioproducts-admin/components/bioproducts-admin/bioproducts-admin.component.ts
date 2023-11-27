import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

//Interfaces
import { Product } from 'src/app/Interfaces/Product';

//Servicios
import { ProductPosFilterService } from 'src/app/Services/FilterServices/product-pos-filter.service';
import { ProductService } from '../../../../Services/EntitiesServices/product.service';


@Component({
  selector: 'app-bioproducts-admin',
  templateUrl: './bioproducts-admin.component.html',
  styleUrls: ['./bioproducts-admin.component.css'],
})


export class BioproductsAdminComponent implements OnInit{
  _data: Product[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,

    private _bioproductservice: ProductService,

  ) {}
  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.loading = true;
    this._bioproductservice.getAll().subscribe((data) => {
      this._dataColumns = {
        id: 'id',
        nombre: 'name',
        tipo: 'type'

      };
      this._data = data;
      this.loading = false;
    });
  }
  Delete(id: string) {
    this.loading = true;
    this._bioproductservice.remove(id).subscribe(() => {
      this._snackBar.open('Eliminado con éxito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
