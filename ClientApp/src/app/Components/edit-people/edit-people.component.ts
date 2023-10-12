import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User as Usuario } from 'src/app/Interfaces/User';
import { PersonaService } from 'src/app/Services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css'],
})
export class EditPeopleComponent {
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _personservice: PersonaService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      Id: ['', Validators.required],
      Username: ['', Validators.required],
      Pasword: ['', Validators.required],
    });
  }

  Agregar() {
    const User: Usuario = {
      username: this.form.value.Username,
      hashPassword: this.form.value.Pasword,
    };

    this._personservice.addperson(User).subscribe((data) => {
      this._snackBar.open('delete sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['/listpersons']);
      console.log(User);
    });
  }
}
