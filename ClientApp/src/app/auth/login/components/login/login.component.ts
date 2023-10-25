import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { LoginModel } from 'src/app/Interfaces/Loginmodel';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username?: string;
  contrasena?: string;
  rememberMe: boolean = false;
  constructor(
    private _loginservice: LoginService,
    private _snackBar: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    const loginmodel: LoginModel = {
      name: form.value.username,
      password: form.value.password,
    };
    console.log(loginmodel);
    this.rememberMe = Boolean(this.rememberMe);
    console.log(this.rememberMe);
    this._loginservice
      .sendData(loginmodel)
      .pipe(
        catchError((error) => {
          console.error('Hubo un error:', error);
          this._snackBar.open(
            'Nombre de usuario o contraseña incorrectos. Por favor, vuelva a introducir sus datos.',
            'Cerrar',
            {
              duration: 5000,
            }
          );
          form.resetForm();
          return throwError(error);
        })
      )
      .subscribe();
    // aquí puedes enviar los datos al backend
  }
}
