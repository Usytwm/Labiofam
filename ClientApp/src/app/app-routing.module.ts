import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { InfoComponent } from './Components/info/info.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';

import { ProductManagementComponent } from './Components/product-management/product-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'users-management',
    component: UserManagementComponent,
  },
  {
    path: 'users-management/info/:id',
    component: InfoComponent,
  },
  {
    path: 'product-management',
    component: ProductManagementComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
