import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = new Router();

  if (localStorage.getItem('access_token')) {
    return true;
  }
  _router.navigate(['/login']);
  return false;
};
