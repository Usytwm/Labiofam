import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Interfaces/Usuario';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css'],
})
export class EditPeopleComponent {
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Id: ['', Validators.required],
      Username: ['', Validators.required],
      Pasword: ['', Validators.required],
    });
  }

  Agregar() {
    const User: Usuario = {
      Username: this.form.value.Username,
      HashPassword: this.form.value.Pasword,
    };
    console.log(User);
  }
}
