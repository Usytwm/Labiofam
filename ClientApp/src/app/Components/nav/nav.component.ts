import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/EntitiesServices/services.service';
import { Service } from '../../Interfaces/Service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user = faUser;
  isLogged = false;
  servicios: Service[] = [];

  constructor(
    private _servicesservices: ServicesService,
    private _auhtservice: AuthService
  ) {}
  ngOnInit(): void {
    this.islogged();
    this.obtenerServicios();
  }

  islogged() {
    this._auhtservice.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLogged = isLoggedIn;
    });
  }

  obtenerServicios() {
    this._servicesservices.getAll().subscribe((data) => {
      this.servicios = data;
    });
  }
  // Cambia esto según el estado de inicio de sesión de tu usuario

  logout() {
    this._auhtservice.logout();
    this.isLogged = false;
  }
}
