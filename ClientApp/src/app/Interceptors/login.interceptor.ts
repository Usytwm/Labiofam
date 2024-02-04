import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../Services/RegistrationsService/auth.service';
import { LoginResponse } from '../Interfaces/LoginResponse';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private _auhtservice: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this._auhtservice.getToken();

    if (token) {
      console.log('no expirado');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('expirado');

          // El token ha expirado, genera un nuevo token
          return this._auhtservice.generateNewToken().pipe(
            switchMap((loginResponse: LoginResponse) => {
              // Almacena el nuevo token y el nuevo refreshToken
              this._auhtservice.storeToken(
                loginResponse.token,
                loginResponse.refreshToken
              );
              // Clona la solicitud original y reemplaza el token vencido con el nuevo token
              const clonedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${loginResponse.token}`,
                },
              });
              // Reenvía la solicitud con el nuevo token
              return next.handle(clonedRequest);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
