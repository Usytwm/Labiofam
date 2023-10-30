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
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  loading = false;
  id: string;
  operacion = 'Agregar';
  user?: User;

  form = this.fb.group({
    Username: ['', [Validators.required, Validators.pattern('^[^\\s]*$')]],
    Password: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
      ],
    ],
  });

  roleControl = new FormControl<User_Role | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  _roles?: Role[];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private userservice: UserService,
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
      // Si estás editando, la contraseña no es requerida
      this.form.controls['Password'].clearValidators();
      this.form.controls['Password'].updateValueAndValidity();
    } else {
      // Si estás agregando, la contraseña es requerida
      // Si estás agregando, la contraseña es requerida
      this.form.controls['Password'].setValidators([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
      ]);
      this.form.controls['Password'].updateValueAndValidity();
    }
  }

  getUser(id: string) {
    this.loading = true;
    this.userservice.get(id).subscribe((data) => {
      this.user = data;
      console.log(data);
      this.form.patchValue({ Username: data.userName });
      this.loading = false;
    });
  }

  editUser() {
    this.loading = true;
    this.registrationService.update(this.id, this.newUser()).subscribe(() => {
      this.snackBar.open('Edit sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      //console.log(this.newUser());
      this.router.navigate(['/dashboard/users']);
    });
  }

  addUser() {
    // console.log(this.newUser());
    this.registrationService.add(this.newUser()).subscribe((data) => {
      this.snackBar.open('Add sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      //console.log(this.newUser());
      this.router.navigate(['/dashboard/users']);
    });
  }

  newUser(): RegistrationModel {
    return {
      name: this.form.value.Username!,
      password: this.form.value.Password!,
      old_Password: '',
      email: '',
      email_Token: '',
    };
  }
}
