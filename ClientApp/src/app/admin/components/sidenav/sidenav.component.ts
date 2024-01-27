import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faBars, faHamburger } from '@fortawesome/free-solid-svg-icons';

import { navbarData } from './nav-data';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { Role } from 'src/app/Interfaces/Role';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';
import { NavbarService } from 'src/app/Services/async/navbar.service';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger(':leave', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private navbarService: NavbarService
  ) {}
  showFiller = false;
  barra = faBars;

  navData = navbarData;
  screenWidth = 0;
  collapsed = false;

  datos?: RegistrationRequestModel;
  role?: Role;
  user?: RegistrationModel;

  ngOnInit() {
    this.navbarService.setShowNavbar(false);
    this.screenWidth = window.innerWidth;
    const token = this.authService.getToken();
    if (token != null)
      this.authService.getData(token).subscribe((data) => {
        this.datos = data;
        this.datos.role.name;
        this.datos.user.name;
        this.role = this.datos?.role;
        this.user = this.datos?.user;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  closeSidenav(): void {
    this.collapsed = false;
  }

  getBodyClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 0 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
  logout() {}
}
