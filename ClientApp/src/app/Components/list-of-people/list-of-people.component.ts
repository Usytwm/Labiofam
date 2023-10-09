import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from 'src/app/Interfaces/Usuario';

const users: Usuario[] = [
  { IDUsuario: 1, Username: 'Hydrogen', HashPassword: 'H' },
  { IDUsuario: 2, Username: 'Hytehhttjrjry', HashPassword: 'j' },
  { IDUsuario: 3, Username: 'Hythrthrhtn', HashPassword: 'k' },
  { IDUsuario: 4, Username: 'Hrgergrr', HashPassword: 'l' },
  { IDUsuario: 5, Username: 'sffsgegsf', HashPassword: 'm' },
  { IDUsuario: 6, Username: 'Hydrogdvgsfxven', HashPassword: 'n' },
  { IDUsuario: 7, Username: 'Hdscsdrogen', HashPassword: 'oo' },
];
@Component({
  selector: 'app-list-of-people',
  templateUrl: './list-of-people.component.html',
  styleUrls: ['./list-of-people.component.css'],
})
export class ListOfPeopleComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'IDUsuario',
    'Username',
    'HashPassword',
    'Actions',
  ];
  dataSource = new MatTableDataSource<Usuario>(users);
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit(): void {}

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

  Delete() {
    this._snackBar.open('delete sucess', '', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}
