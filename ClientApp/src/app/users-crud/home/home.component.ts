import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User as Usuario } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  //pruba
  public userForm = new FormControl(); //fromulario reactivo
  //termina prueba
  displayedColumns: string[] = ['Username', 'Role', 'Actions'];
  dataSource = new MatTableDataSource<Usuario>();
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _personasservice: UserService
  ) {}
  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.loading = true;
    this._personasservice.getAll().subscribe((data) => {
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

  Delete(id: string) {
    this.loading = true;
    this._personasservice.delete(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.obtenerPersonas();
    });
  }
}
