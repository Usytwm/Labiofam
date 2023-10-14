import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/Interfaces/Role';
import { UserService } from 'src/app/Services/user.service';
import { RolesService } from 'src/app/Services/roles.service';
import { User_Role } from 'src/app/Interfaces/User_Role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  loading = false;
  id: string;
  operacion = 'Agregar';
  user?: User;

  form = this.fb.group({
    Username: ['', Validators.required],
  });

  roleControl = new FormControl<User_Role | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  _roles?: Role[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roles: RolesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.roles.getAll().subscribe((data) => {
      this._roles = data;
    });
  }

  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getUser(this.id);
    }
  }

  getUser(id: string) {
    this.loading = true;
    this.userService.get(id).subscribe((data) => {
      this.user = data;
      this.form.patchValue({ Username: data.name });
      this.loading = false;
    });
  }

  editUser() {
    this.loading = true;
    this.userService.update(this.id, this.newUser()).subscribe(() => {
      this.snackBar.open('Edit sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.newUser());
      this.router.navigate(['/users-management']);
    });
  }

  addUser() {
    this.userService.add(this.newUser()).subscribe((data) => {
      this.snackBar.open('Add sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      console.log(this.newUser());
      this.router.navigate(['/users-management']);
    });
  }

  newUser(): User {
    return {
      name: this.form.value.Username!,
      password: ' ',
      roles: [this.roleControl.value!],
      products: [],
    };
  }
}
