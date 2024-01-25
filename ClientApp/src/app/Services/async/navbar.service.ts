import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private showNavbarSource = new BehaviorSubject(true);
  showNavbar$ = this.showNavbarSource.asObservable();

  setShowNavbar(show: boolean) {
    this.showNavbarSource.next(show);
  }
}
