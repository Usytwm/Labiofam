import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Role } from 'src/app/Interfaces/Role';
import { UserService } from 'src/app/Services/user.service';
import { RolesService } from 'src/app/Services/roles.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  loading = false;
  id: string;
  user?: User;
  operacion: string = 'Agregar';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl('');
  filteredRoles!: Observable<Role[]>;
  roless: Role[] = [];
  allRoles: Role[] = []; // Aquí debes cargar todos los roles desde tu servicio

  @ViewChild('roleInput') roleInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  userForm = new FormGroup({
    user_ID: new FormControl<string>(''),
    name: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  constructor(
    private userService: UserService,
    private rolesservice: RolesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activateroute: ActivatedRoute
  ) {
    this.rolesservice.getAll().subscribe((roles) => {
      this.allRoles = roles;
      this.filteredRoles = this.roleCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => this._filter(role!))
      );
    });
    ///nuevo
    this.id = String(this.activateroute.snapshot.paramMap.get('id'));
  }

  add(event: MatChipInputEvent): void {
    const input = (event.value || '').trim();

    // Añade nuestro rol
    if (input) {
      const role = this.allRoles.find((r) => r.name === input);
      if (role && !this.roless.includes(role)) {
        // Aquí verificamos si el rol ya existe
        this.roless.push(role);
      }
    }

    // Limpia el valor del input
    event.chipInput!.clear();

    this.roleCtrl.setValue(null);
  }

  remove(role: Role): void {
    const index = this.roless.indexOf(role);

    if (index >= 0) {
      this.roless.splice(index, 1);

      this.announcer.announce(`Removed ${role.name}`);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedRole = this.allRoles.find(
      (role) => role.name === event.option.viewValue
    );
    if (selectedRole && !this.roless.includes(selectedRole)) {
      // Aquí verificamos si el rol ya existe
      this.roless.push(selectedRole);
    }
    if (this.roleInput && this.roleInput.nativeElement) {
      this.roleInput.nativeElement.value = '';
    }
    this.roleCtrl.setValue(null);
  }

  private _filter(value: string): Role[] {
    if (value) {
      const filterValue = value;
      return this.allRoles.filter((role) =>
        role.name!.toLowerCase().includes(filterValue)
      );
    } else {
      return this.allRoles.slice();
    }
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
      this.userForm.patchValue({
        user_ID: data.user_ID,
        name: data.name,
        password: data.password,
      });
      this.loading = false;
    });
  }

  editUser(): void {
    this.loading = true;
    this.userService.update(this.id, this.currentUser).subscribe(() => {
      this.snackBar.open('Edit sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.loading = false;
      console.log(this.currentUser);
      this.router.navigate(['users']);
    });
  }

  addUser(): void {
    const user = {
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
    };

    const roles = this.roless;

    const userWithRoles = { user, roles };

    this.userService.add(this.currentUser).subscribe((data) => {
      this.snackBar.open('Add sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['users']);
    });
  }

  get currentUser(): User {
    return {
      name: this.userForm.value.name!,
      password: this.userForm.value.password!,
      roles: [],
      products: [],
    };
  }
}
