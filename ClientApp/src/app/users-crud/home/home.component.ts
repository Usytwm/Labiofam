import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { clippingParents } from '@popperjs/core';
import { User, User as Usuario } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  _data: User[] = [];
  _dataColumns: string[] = [];
  loading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _userservice: UserService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.loading = true;
    this._userservice.getAll().subscribe((data) => {
      this._dataColumns = ['name', 'roles', 'password'];
      this._data = data;
      this.loading = false;
    });
  }

  ///dsfsd

  Delete(id: string) {
    this.loading = true;
    this._userservice.delete(id).subscribe(() => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      this.getAll();
    });
  }
}
