import { Component,OnInit } from '@angular/core';
import { AuthService } from './../../../Services/RegistrationsService/auth.service';
import { User } from 'src/app/Interfaces/User';
import { User_Role } from '../../../Interfaces/User_Role';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIwOGRiZjQzMi0xOWMxLTRiYjAtODBiNC01YzBjOTAyNDczYTgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTGVvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoic2VydmljZXJvIiwiZXhwIjoxNzAxNjM5OTYzLCJpc3MiOiJXZWJBcGlKd3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNjMifQ.g69-yvtYIPiFVW-hm9Pq7zHdDJQzsatXEqCZ8Fv0k4U";
  }
  private token: string;
  datos?: User;
  rolesList?: User_Role[];
  roles?: (string | undefined)[];
  user?: string;

ngOnInit(){
  this.authService.getData(this.token).subscribe(data => {
    this.datos = data;
  });
  this.rolesList = this.datos?.roles;
  console.log("RolesList:" + this.rolesList);
  this.roles = this.Roles();
  this.user = this.username();
  console.log("User:" + this.user);
  console.log("Roles:" + this.roles);

}
  Roles() {
    return this.rolesList?.map(value => value.role?.name);
  }

  username() {
    return this.datos?.userName;
  }
}
