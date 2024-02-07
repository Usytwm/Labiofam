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
import { FileService } from 'src/app/Services/FilesService/File.service';

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
  image?: string;
  imagePreview?: string;
  constructor(
    private authService: AuthService,
    private navbarService: NavbarService,
    private _fotoservice: FileService
  ) {}
  showFiller = false;
  barra = faBars;

  navData = navbarData;
  screenWidth = 0;
  collapsed = false;

  datos?: RegistrationRequestModel;
  role!: Role[];
  user?: RegistrationModel;
  getPhoto(photoName: string) {
    this._fotoservice.getPhoto(photoName).subscribe((photo) => {
      // console.log(photo);
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  ngOnInit() {
    this.navbarService.setShowNavbar(false);
    this.screenWidth = window.innerWidth;
    const token = this.authService.getToken();
    if (token != null)
      this.authService.getData(token).subscribe((data) => {
        this.datos = data;
        this.role = this.datos?.roles;
        this.user = this.datos?.user;
        if (this.datos.user.image) {
          this.getPhoto(this.datos.user.image);
          this.imagePreview = this.datos.user.image;
        }
        this.navData.forEach((data) => {
          data.pas = this.role.some((r) => data.permisos.includes(r.name!));
        });
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
