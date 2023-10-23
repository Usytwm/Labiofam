import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos nuevos
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';
import { SeccionAdminModule } from './admin/seccion-admin.module';
//======
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './Shared/shared.module';
import { GenericCrudsModule } from './generic-cruds/generic-cruds.module';
import { PointsOfSalesCrudModule } from './points-of-sales-crud/points-of-sales-crud.module';
import { UsersCrudModule } from './users-crud/users-crud.module';

//Componentes

import { AppComponent } from './app.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { InfoComponent } from './Components/info/info.component';

import { UserManagementComponent } from './Components/user-management/user-management.component';
import { ProductManagementComponent } from './Components/product-management/product-management.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    InfoComponent,
    UserManagementComponent,
    ProductManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PointsOfSalesCrudModule,
    UsersCrudModule,
    GenericCrudsModule,
    AuthModule,
    PublicModule,
    SeccionAdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
