import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthService } from '../Services/RegistrationsService/auth.service';
import { LoginResponse } from '../Interfaces/LoginResponse';
import { Router } from '@angular/router';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.authService.getToken();

    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Intentar renovar el token
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.generateNewToken().pipe(
      switchMap((loginResponse: LoginResponse) => {
        if (loginResponse.token) {
          this.authService.storeToken(
            loginResponse.token,
            loginResponse.refreshToken
          );
          return next.handle(
            this.addTokenToRequest(request, loginResponse.token)
          );
        }
        // Si no se obtiene un nuevo token, redirigir al login
        this.router.navigate(['/login']);
        this.authService.clearStorage();
        return throwError(() => new Error('Token renewal failed'));
      }),
      catchError((err) => {
        // Si hay un error al renovar el token, redirigir al login
        this.router.navigate(['/login']);
        this.authService.clearStorage();
        return throwError(err);
      })
    );
  }
}
