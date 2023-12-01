import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


//modulos
import { SharedModule } from 'src/app/Shared/shared.module';

//componentes
import { HomeAdminComponent } from './home-admin/home-admin.component';

@NgModule({
  declarations: [HomeAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class HomeAdminModule { }


