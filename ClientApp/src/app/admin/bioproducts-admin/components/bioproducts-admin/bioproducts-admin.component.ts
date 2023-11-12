import { Component , ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

//Interfaces
import { Product } from 'src/app/Interfaces/Product';


//Servicios
import { FilterService } from 'src/app/Services/filter.service';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';

@Component({
  selector: 'app-bioproducts-admin',
  templateUrl: './bioproducts-admin.component.html',
  styleUrls: ['./bioproducts-admin.component.css']
})

export class BioproductsAdminComponent {

  _data: Product[] = [];
  _dataColumns: Record<string, string> = {};
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _bioproductservice: ProductService,
    private _filter: FilterService
  ) {}
  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.loading = true;
    this._bioproductservice.getAll().subscribe((data) => {
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
