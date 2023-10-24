import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent implements OnInit {
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
