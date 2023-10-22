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
import { AbstractService } from '../../Services/generic-crud.service';
import { TableColumn } from '../table-column';
@Component({
  selector: 'app-generic-table-crud',
  templateUrl: './generic-table-crud.component.html',
  styleUrls: ['./generic-table-crud.component.css'],
})
export class GenericTableCrudComponent<T> implements OnInit, AfterViewInit {
  @Input() data!: T[];
  @Input() columns!: string[];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: Boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = changes['data'].currentValue;
      console.log(this.dataSource.data);
    }
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  @Output() delete = new EventEmitter<string>();

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

  Delete(id: string) {}
}
