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
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent<T> implements OnInit, AfterViewInit {
  /**
   * @Input data: Los datos que se mostrarán en la tabla. Debe ser un array de objetos,
   * donde cada objeto representa una fila de la tabla. Los nombres de las propiedades del objeto
   * deben coincidir con los valores del array 'columns'.
   */
  @Input() data!: T[];

  /**
   * @Input columns: Los nombres de las columnas que se mostrarán en la tabla. Debe ser un array de strings,
   * donde cada string es el nombre de una columna. El primer elemento del array debe ser el nombre del ID del tipo
   * que sea. Los valores del array 'columns' deben coincidir con los nombres de las propiedades del objeto en el
   * array 'data'.
   */
  @Input() columns!: string[];

  /**
   * @Output delete: Un evento que se emite cuando se necesita eliminar un elemento de la tabla. El valor emitido es
   * el ID del elemento que se va a eliminar.
   */
  @Output() delete = new EventEmitter<string>();

  //@Input() Delete(id: string): void {}

  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: Boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = changes['data'].currentValue.map((item: any) => {
        return { ...item, elementId: item[this.columns.shift()!] };
      });
      this.columns = this.columns.filter((column) => column !== 'elementId');
      console.log(this.dataSource.data);
    }
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(protected _snackBar: MatSnackBar) {}

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
