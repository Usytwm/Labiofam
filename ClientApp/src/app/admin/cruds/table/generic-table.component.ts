import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
  providers: [MatPaginator, MatSort],
})
export class GenericTableComponent<T> implements OnInit, AfterViewInit {
  @Input() data!: T[];

  /**
   * @Input columns: Los nombres de las columnas que se mostrarán en la tabla. Debe ser un objeto con claves y valores de tipo string,
   * donde cada clave es el nombre de una columna y cada valor es el nombre de la propiedad del objeto en el array 'data'.
   */
  @Input() columns!: Record<string, string>;

  /**
   * @Output delete: Un evento que se emite cuando se necesita eliminar un elemento de la tabla. El valor emitido es
   * el ID del elemento que se va a eliminar.
   */
  @Output() delete = new EventEmitter<string>();

  dataSource!: MatTableDataSource<T>;
  dataLoaded: boolean = false;
  existobjects: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  loading: Boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      let newData = changes['data'].currentValue.map((item: any) => {
        let newItem = { ...item, elementId: item[this.columns['id']] };
        return newItem;
      });
      this.dataSource = new MatTableDataSource<T>(newData);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
      this.dataLoaded = true;
      // Elimina la columna 'id'
      delete this.columns['id'];
    }
    if (this.dataSource.sort) {
      this.dataSource.sort.sortChange.emit();
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<T>(this.data);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  constructor(protected _snackBar: MatSnackBar, private _pag: MatPaginator) {}
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.data);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  keys(): string[] {
    return Object.keys(this.columns);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(id: string) {
    this.delete.emit(id);
  }
}
