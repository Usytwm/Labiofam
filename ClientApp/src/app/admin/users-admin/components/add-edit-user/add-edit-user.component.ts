import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/Interfaces/Role';
import { UserService } from 'src/app/Services/EntitiesServices/user.service';
import { RolesService } from 'src/app/Services/EntitiesServices/roles.service';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { RegistrationService } from 'src/app/Services/RegistrationsService/registration.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from '../../../../Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { RoleModel } from 'src/app/Interfaces/Role-Model';
import { UserRoleFilterService } from 'src/app/Services/FilterServices/user-roles-filter.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  roleCtrl = new FormControl('', Validators.required);
  filtered_roles_name!: Observable<string[]>;

  _roles_name: string[] = [];
  _all_roles_name!: string[];
  _roles?: Role[];

  @ViewChild('roleInput') roleInput?: ElementRef<HTMLInputElement>;

  loading = false;
  id: string;
  operacion = 'Agregar';
  user?: User;

  form = this.fb.group({
    Username: ['', [Validators.required, Validators.pattern('^[^\\s]*$')]],
    Newpassword: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
      ],
    ],
    Oldpassword: ['', [Validators.pattern('^[^\\s]*$')]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: RegistrationService,
    private userservice: UserService,
    private roles: RolesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private filter: UserRoleFilterService,
    private registrationservice: AuthService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    //obtengo la lista de todos los roles
    this.roles.getAll().subscribe((data) => {
      this._roles = data;
      this._all_roles_name = this._roles!.map((role) => role.name!);
      this.filtered_roles_name = this._observer();
      this._all_roles_name = this._roles!.map((role) => role.name!);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this._roles_name.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.roleCtrl.setValue(null);
  }

  remove(role: string): void {
    const index = this._roles_name.indexOf(role);

    if (index >= 0) {
      // Eliminar role de _roles_name
      this._roles_name.splice(index, 1);

      // Agregar role a all_roles_name
      this._all_roles_name.push(role);
      //actualizar el observable que muetra los roles
      this.filtered_roles_name = this._observer();
      this._all_roles_name.push(role);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._roles_name.push(event.option.viewValue);
    this.roleInput!.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    // Filtrar all_roles_name
    const filteredRoles = this._all_roles_name.filter((role) =>
      role.toLowerCase().includes(filterValue)
    );

    // Eliminar value de all_roles_name
    this._all_roles_name = this._all_roles_name.filter(
      (role) => role.toLowerCase() !== filterValue
    );

    return filteredRoles;
  }

  private _observer(): Observable<string[]> {
    return this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) =>
        role ? this._filter(role) : this._all_roles_name.slice()
      )
    );
  }

  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getUser(this.id);

      // Si estás editando, la contraseña no es requerida
      this.form.controls['Newpassword'].clearValidators();
      this.form.controls['Newpassword'].setValidators([
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
      ]);
      this.form.controls['Oldpassword'].setValidators([
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
      ]);
      this.form.controls['Newpassword'].updateValueAndValidity();
      this.form.controls['Oldpassword'].updateValueAndValidity();
    } else {
      // Si estás agregando, la contraseña es requerida
      this.form.controls['Newpassword'].setValidators([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
      ]);
      this.form.controls['Newpassword'].updateValueAndValidity();
    }
  }

  getUser(id: string) {
    this.loading = true;
    this.userservice.get(id).subscribe((data) => {
      this.user = data;
      this.form.patchValue({ Username: data.userName });
      this.loading = false;
    });
    this.filter.getType1byType2(id).subscribe((data) => {
      this._roles_name = data.map((x) => x.name!);
    });
  }

  editUser() {
    this.loading = true;
    this.userService
      .edit(this.id, this.newUser())
      .pipe()
      .subscribe(() => {
        this.snackBar.open('Editado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.loading = false;
        this.router.navigate(['/dashboard/users-admin']);
      });
  }

  addUser() {
    this.registrationservice
      .register(this.newRegistrationRequest())
      .subscribe((data) => {
        this.snackBar.open('Agregado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });

        this.router.navigate(['/dashboard/users-admin']);
      });
  }

  private newUser(): RegistrationModel {
    return {
      name: this.form.value.Username!,
      password:
        this.operacion === 'Agregar'
          ? this.form.value.Newpassword!
          : this.form.value.Oldpassword!,
      old_Password:
        this.operacion === 'Agregar'
          ? this.form.value.Oldpassword!
          : this.form.value.Newpassword!,
      email: '',
      email_Token: '',
    };
  }
  private newRole(): RoleModel {
    return {
      name: this._roles_name[0],
      Description: '',
    };
  }
  private newRegistrationRequest(): RegistrationRequestModel {
    return {
      user: this.newUser(),
      role: this.newRole(),
    };
  }
}
