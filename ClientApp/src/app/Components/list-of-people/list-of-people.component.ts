import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User as Usuario } from 'src/app/Interfaces/User';
import { PersonaService } from 'src/app/Services/persona.service';

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
  dataSource = new MatTableDataSource<Usuario>();
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _personasservice: PersonaService
  ) {}
  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this._personasservice.getPerson().subscribe((data) => {
      this.dataSource.data = data;
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

  Delete(id: Number) {
    this._personasservice.deletePerson(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.obtenerPersonas();
    });
  }
}
