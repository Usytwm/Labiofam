import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from 'src/app/Services/filter.service';

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
  all_roles_name!: string[];
  _roles?: Role[];
  @ViewChild('roleInput') roleInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

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

  selectFormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private userservice: UserService,
    private roles: RolesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private filter: FilterService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    // Inicializa roleCtrl antes de la suscripción
    this.roleCtrl = new FormControl('', Validators.required);

    //obtengo la lista de todos los roles
    this.roles.getAll().subscribe((data) => {
      this._roles = data;
      this.all_roles_name = this._roles!.map((role) => role.name!);
      this.filtered_roles_name = this.roleCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) =>
          role ? this._filter(role) : this.all_roles_name.slice()
        )
      );
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
      this.all_roles_name.push(role);

      this.announcer.announce(`Removed ${role}`);
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
    const filteredRoles = this.all_roles_name.filter((role) =>
      role.toLowerCase().includes(filterValue)
    );

    // Eliminar value de all_roles_name
    this.all_roles_name = this.all_roles_name.filter(
      (role) => role.toLowerCase() !== filterValue
    );

    return filteredRoles;
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
    this.filter.getrolesbyuser(id).subscribe((data) => {
      this._roles_name = data.map((x) => x.name!);
      this._roles_name.push('vida');
    });
  }

  editUser() {
    this.loading = true;
    this.registrationService
      .update(this.id, this.newUser())
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
    this.registrationService.add(this.newUser()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });

      this.router.navigate(['/dashboard/users-admin']);
    });
  }

  newUser(): RegistrationModel {
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
}
