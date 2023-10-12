import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User as Usuario } from 'src/app/Interfaces/User';
import { PersonaService } from 'src/app/Services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css'],
})
export class EditPeopleComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: string;
  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _personservice: PersonaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      Id: ['', Validators.required],
      Username: ['', Validators.required],
      Pasword: ['', Validators.required],
    });
    this.id = String(this.aRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id != 'null') {
      this.operacion = 'Editar';
      this.obtenerpersona(this.id);
    }
  }

  obtenerpersona(id: string) {
    this.loading = true;
    this._personservice.getPersona(id).subscribe((data) => {
      this.form.patchValue({
        Id: data.user_ID,
        Username: data.name,
        Pasword: data.password,
      });
      this.loading = false;
    });
  }

  Agregar() {
    const User: Usuario = {
      name: this.form.value.Username,
      password: this.form.value.Pasword,
    };

    this._personservice.addperson(User).subscribe((data) => {
      this._snackBar.open('sucess', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['/listpersons']);
      console.log(User);
    });
  }
}
