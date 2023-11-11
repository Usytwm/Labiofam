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
import { MatTableDataSource } from '@angular/material/table';
import { faL } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
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

  //@Input() Delete(id: string): void {}

  dataSource = new MatTableDataSource<T>();
  dataLoaded: boolean = false;
  existobjects: boolean = false;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: Boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.dataLoaded = false;
    if (changes['data']) {
      this.dataSource.data = changes['data'].currentValue.map((item: any) => {
        let newItem = { ...item, elementId: item[this.columns['id']] };
        this.dataLoaded = true;
        return newItem;
      });
      this.columns = { ...this.columns };
      delete this.columns['id']; //elimina la columna id de la tabla para que no se muetre
    }

    if (this.dataLoaded) {
      this.existobjects = true;
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(protected _snackBar: MatSnackBar) {}

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
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
  }
  deleteRow(id: string) {
    this.delete.emit(id);
  }
}
