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

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput?: ElementRef<HTMLInputElement>;

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
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput!.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
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
      console.log(data);
      this.form.patchValue({ Username: data.userName });
      this.loading = false;
    });
  }

  editUser() {
    this.loading = true;
    this.registrationService
      .update(this.id, this.newUser())
      .pipe()
      .subscribe(() => {
        this.snackBar.open('Edit sucess', '', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.loading = false;
        //console.log(this.newUser());
        this.router.navigate(['/dashboard/users-admin']);
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
