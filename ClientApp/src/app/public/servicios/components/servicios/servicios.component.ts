import { Service } from './../../../../Interfaces/Service';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesService } from './../../../../Services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServicesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Nombre', 'Descripción'];
  dataSource = new MatTableDataSource<Service>();
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _servicesservices: ServicesService
  ) {}
  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios() {
    this.loading = true;
    this._servicesservices.getAll().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

/*  Delete(id: string) {
    this.loading = true;
    this._servicesservices.delete(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.obtenerServicios();
    });
  }*/
}
