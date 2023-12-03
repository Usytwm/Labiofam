import { Component } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faBars, faHamburger } from '@fortawesome/free-solid-svg-icons';

import { navbarData } from './nav-data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  showFiller = false;
  barra = faBars;
  navData = navbarData;
  logout() {}
}
