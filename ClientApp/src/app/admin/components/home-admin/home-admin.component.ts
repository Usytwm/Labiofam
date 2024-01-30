import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { Role } from 'src/app/Interfaces/Role';
import { RegistrationModel } from '../../../Interfaces/registration-model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  constructor(private authService: AuthService) {}
  datos?: RegistrationRequestModel;
  role?: Role[];
  user?: RegistrationModel;
  rol?: string;
  superadmin?: boolean;
  superadminandpos?: boolean;
  superadminandServices?: boolean;

  ngOnInit() {
    const token = this.authService.getToken();
    if (token != null)
      this.authService.getData(token).subscribe((data) => {
        this.datos = data;
        this.role = this.datos?.roles;
        this.user = this.datos?.user;
        this.rol = this.datos!.roles!.map((role) => role!.name).join(', ');
        this.superadmin = this.datos!.roles!.some(
          (role) => role.name === 'superadmin'
        );
        console.log(this.superadmin);

        this.superadminandpos = this.datos!.roles!.some(
          (role) => role.name === 'Gestor de Puntos de Venta'
        );
        console.log(this.superadminandpos);

        this.superadminandServices = this.datos!.roles!.some(
          (role) => role.name === 'Coordinador de Servicios'
        );
        console.log(this.superadminandServices);
      });
  }
}
