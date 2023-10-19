import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { SharedModule } from '../Shared/shared.module';

//componentes
import { UsersCrudRoutingModule } from './users-crud-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    UpdateComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, UsersCrudRoutingModule, SharedModule],
})
export class UsersCrudModule {}
