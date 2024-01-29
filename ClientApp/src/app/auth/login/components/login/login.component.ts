import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { LoginModel } from 'src/app/Interfaces/Loginmodel';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/Services/async/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  rememberMe: boolean = false;
  constructor(
    private _authnservice: AuthService,
    private _snackBar: MatSnackBar,
    private _route: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarService.setShowNavbar(false);
    window.scrollTo(0, 0);
  }
  onSubmit() {
    const loginmodel: LoginModel = {
      name: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    console.log(loginmodel);

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
        this._authnservice.storeToken(res.token, res.refreshToken);
        this._route.navigate(['/home']);
      });
  }
}
