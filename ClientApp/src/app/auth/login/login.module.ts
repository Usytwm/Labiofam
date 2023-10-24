import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

//material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//componentes
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class LoginModule {}
