import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../Services/EntitiesServices/services.service';
import { Service } from '../../Interfaces/Service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/RegistrationsService/auth.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { User } from '../../Interfaces/User';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user = faUser;
  data?: RegistrationRequestModel;
  @ViewChild('op') op?: OverlayPanel;
  isLogged = false;
  servicios: Service[] = [];

  constructor(
    private _servicesservices: ServicesService,
    private _auhtservice: AuthService
  ) {}
  ngOnInit(): void {
    this.getData();
    this.islogged();
    this.obtenerServicios();
  }

  islogged() {
    this._auhtservice.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getData();
      }
    });
  }
  getData() {
    const token = this._auhtservice.getToken();
    if (token)
      this._auhtservice.getData(token).subscribe((datos) => {
        this.data = datos;
        datos.role.name;
      });
  }
  obtenerServicios() {
    this._servicesservices.getAll().subscribe((data) => {
      this.servicios = data;
    });
  }
  // Cambia esto según el estado de inicio de sesión de tu usuario

  logout() {
    this._auhtservice.logout().subscribe((res) => {
      console.log(res);
    });
    this.isLogged = false;
    window.location.reload();
  }
  logoutAndHide() {
    this.logout();
    if (this.op) this.op.hide();
  }
}
