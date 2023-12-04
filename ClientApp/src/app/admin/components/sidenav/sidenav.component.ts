import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faBars, faHamburger } from '@fortawesome/free-solid-svg-icons';

import { navbarData } from './nav-data';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { Role } from 'src/app/Interfaces/Role';
import { RegistrationModel } from 'src/app/Interfaces/registration-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private authService: AuthService) {}
  showFiller = false;
  barra = faBars;
  navData = navbarData;
  logout() {}
  datos?: RegistrationRequestModel;
  role?: Role;
  user?: RegistrationModel;

  ngOnInit() {
    const token = this.authService.getToken();
    console.log(token);
    this.authService.getData(token).subscribe((data) => {
      this.datos = data;
      this.datos.role.name;
      this.datos.user.name;
      this.role = this.datos?.role;
      this.user = this.datos?.user;
      console.log('User:' + this.user);
      console.log('Role:' + this.role);
    });
  }
}
