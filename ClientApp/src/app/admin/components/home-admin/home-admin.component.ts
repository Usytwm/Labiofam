import { Component,OnInit } from '@angular/core';
import { AuthService } from './../../../Services/RegistrationsService/auth.service';
import { RegistrationRequestModel } from 'src/app/Interfaces/Registration-Request';
import { Role } from 'src/app/Interfaces/Role';
import { RegistrationModel } from '../../../Interfaces/registration-model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  datos?: RegistrationRequestModel;
  role?: Role
  user?: RegistrationModel;

ngOnInit(){
  const token = this.authService.getToken();
  console.log(token);
  this.authService.getData(token).subscribe(data => {
    this.datos = data;
    this.datos.role.name
    this.datos.user.name
  });
  this.role = this.datos?.role;
  this.user = this.datos?.user;
  console.log("User:" + this.user);
  console.log("Role:" + this.role);
}
}
