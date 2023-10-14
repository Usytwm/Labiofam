import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { InfoComponent } from './Components/info/info.component';
import { MapInfoDisplayComponent } from './Components/map-info-display/map-info-display.component';
import { HomeComponent } from './Components/home/home.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { LoginComponent } from './Components/login/login.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { ProductManagementComponent } from './Components/product-management/product-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users-management',
    component: UserManagementComponent,
  },
  {
    path: 'users-management/addUser',
    component: UserEditComponent,
  },
  {
    path: 'users-management/info/:id',
    component: InfoComponent,
  },
  {
    path: 'users-management/edit/:id',
    component: UserEditComponent,
  },
  {
    path: 'product-management',
    component: ProductManagementComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'map',
    component: MapInfoDisplayComponent,
  },
  {
    path: '**',
    redirectTo: 'listpersons',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
