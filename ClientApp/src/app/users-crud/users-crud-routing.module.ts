import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'users',
    component: HomeComponent,
  },
  {
    path: 'users/edit/:id',
    component: CreateComponent,
  },
  {
    path: 'users/details/:id',
    component: DetailsComponent,
  },
  {
    path: 'users/createuser',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersCrudRoutingModule {}
