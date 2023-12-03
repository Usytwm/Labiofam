import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/RegistrationsService/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = new Router();
  const auhtservice = inject(AuthService);

  if (auhtservice.isLoggedIn()) {
    let isAdmin = false;
    const jwt = auhtservice.getToken();
    auhtservice.getData(jwt).subscribe((data) => {
      if (data.role && data.role.name == 'admin') {
        isAdmin = true;
      }
      return isAdmin ? isAdmin : (_router.navigate(['/login']), false);
    });
  }
  _router.navigate(['/login']);
  return false;
};
