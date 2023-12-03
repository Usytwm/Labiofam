import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { LoginModel } from 'src/app/Interfaces/Loginmodel';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  rememberMe: boolean = false;
  constructor(
    private _authnservice: AuthService,
    private _snackBar: MatSnackBar,
    private _route: Router
  ) {}
  onSubmit() {
    const loginmodel: LoginModel = {
      name: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    this.rememberMe = Boolean(this.rememberMe);
    this._authnservice
      .login(loginmodel)
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
          this.loginForm.reset();
          return throwError(error);
        })
      )
      .subscribe((res) => {
        console.log(res.accessToken);
        this._authnservice.saveCookie(res.accessToken);
        this._route.navigate(['/home']);
      });
  }
}
