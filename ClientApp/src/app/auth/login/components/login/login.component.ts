import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username?: string;
  contrasena?: string;
  constructor(
    private _loginservice: LoginService,
    private _snackBar: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    console.log(form.value);
    this._loginservice
      .sendData(form.value)
      .pipe(
        catchError((error) => {
          console.error('Hubo un error:', error);
          this._snackBar.open(
            'Hubo un error. Por favor, vuelve a introducir tus datos.',
            'Cerrar',
            {
              duration: 5000,
            }
          );
          form.resetForm();
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
    // aquí puedes enviar los datos al backend
  }
}
