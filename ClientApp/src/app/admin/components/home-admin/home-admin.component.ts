import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { Role } from 'src/app/Interfaces/Role';
import { RegistrationModel } from '../../../Interfaces/registration-model';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  image?: string;
  imagePreview?: string;
  constructor(
    private authService: AuthService,
    private _fotoservice: FileService
  ) {}
  datos?: RegistrationRequestModel;
  role?: Role[];
  user?: RegistrationModel;
  rol?: string;
  superadmin?: boolean;
  superadminandpos?: boolean;
  superadminandServices?: boolean;
  superadminandBioproductos?: boolean;
  superadminandTestimonios?: boolean;
  superadminandVentas?: boolean;
  getPhoto(photoName: string) {
    this._fotoservice.getPhoto(photoName).subscribe((photo) => {
      // console.log(photo);
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  ngOnInit() {
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
        this.rol = this.datos!.roles!.map((role) => role!.name).join(', ');
        
        this.superadmin = this.datos!.roles!.some(
          (role) => role.name === 'superadmin'
        );
        // console.log(this.superadmin);

        this.superadminandpos = this.datos!.roles!.some(
          (role) => role.name === 'establecimientos'
        );
        // console.log(this.superadminandpos);

        this.superadminandServices = this.datos!.roles!.some(
          (role) => role.name === 'servicios'
        );
        // console.log(this.superadminandServices);

        this.superadminandBioproductos = this.datos!.roles!.some(
          (role) => role.name === 'bioproductos'
        );

        this.superadminandTestimonios = this.datos!.roles!.some(
          (role) => role.name === 'testimonios'
        );

        this.superadminandVentas = this.datos!.roles!.some(
          (role) => role.name === 'ventas'
        );

      });
  }
}
