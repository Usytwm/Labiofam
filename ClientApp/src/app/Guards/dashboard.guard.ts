import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/RegistrationsService/auth.service';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const _router = new Router();
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    switchMap((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const jwt = authService.getToken();
        return authService.getData(jwt).pipe(
          map((data: any) => {
            if (data.role && data.role.name == 'admin') {
              // El usuario está autenticado y es administrador
              return true;
            } else {
              // El usuario está autenticado pero no es administrador
              _router.navigate([`/login`]);
              return false;
            }
          })
        );
      } else {
        // El usuario no está autenticado
        _router.navigate([`/login`]);
        return of(false);
      }
    })
  );
};
