import { Component,ViewChild } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent {
  loading: Boolean = false;
  bioproductos: Product[] = [];
  pageSize: number = 9;
  page: number = 1;

  dataSource!: MatTableDataSource<Product>;
  dataLoaded: boolean = false;
  existobjects: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  constructor(private _bioproductsservices: ProductService) {}
  ngOnInit(): void {
    this.obtenerBioproductos();
    this.dataSource = new MatTableDataSource<Product>(this.bioproductos);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }
  obtenerBioproductos() {
    this.loading = true;
    this._bioproductsservices.getAll().subscribe((data) => {
      this.bioproductos = data;
      console.log(data);
      this.loading = false;
    });
  }

  handlePageChange(event: number) {
    this.page = event;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
