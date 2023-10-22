import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { SharedModule } from '../Shared/shared.module';

//componentes
import { UsersCrudRoutingModule } from './users-crud-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { GenericCrudsModule } from '../generic-cruds/generic-cruds.module';

@NgModule({
  declarations: [HomeComponent, CreateComponent, DetailsComponent],
  imports: [
    CommonModule,
    UsersCrudRoutingModule,
    SharedModule,
    GenericCrudsModule,
  ],
})
export class UsersCrudModule {}
