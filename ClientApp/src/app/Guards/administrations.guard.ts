import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/RegistrationsService/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const _router = new Router();
  const authService = inject(AuthService);
  const expectedRoles = route.data['expectedRoles'];

  return authService.isLoggedIn().pipe(
    switchMap((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        const jwt = authService.getToken();
        return authService.getData(jwt).pipe(
          map((data: any) => {
            if (expectedRoles.includes(data.role.name)) {
              // El usuario está autenticado y tiene uno de los roles esperados
              return true;
            } else {
              // El usuario está autenticado pero no tiene uno de los roles esperados
              _router.createUrlTree(['/login']);
              return false;
            }
          })
        );
      } else {
        // El usuario no está autenticado
        _router.createUrlTree(['/login']);
        return of(false);
      }
    })
  );
};
