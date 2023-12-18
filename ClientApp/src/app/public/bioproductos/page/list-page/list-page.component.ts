import { Component, ViewChild } from '@angular/core';
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

  filteredProducts: Product[] = [];

  dataSource!: MatTableDataSource<Product>;
  dataLoaded: boolean = false;
  existobjects: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private _bioproductsservices: ProductService) {}

  ngOnInit(): void {
    this.obtenerBioproductos();
  }

  obtenerBioproductos() {
    this.loading = true;
    this._bioproductsservices.getAll().subscribe((data) => {
      this.bioproductos = data;
      this.filteredProducts = this.bioproductos;
      this.loading = false;
    });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.bioproductos.filter((product: Product) => {
      return (
        product.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.specifications?.toLowerCase().includes(filterValue.toLowerCase())
      );
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
