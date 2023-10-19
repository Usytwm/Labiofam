import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { SharedModule } from './Shared/shared.module';
import { PointsOfSalesCrudModule } from './points-of-sales-crud/points-of-sales-crud.module';
import { UsersCrudModule } from './users-crud/users-crud.module';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { MapInfoDisplayComponent } from './Components/map-info-display/map-info-display.component';
import { HomeComponent } from './Components/home/home.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { LoginComponent } from './Components/login/login.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { InfoComponent } from './Components/info/info.component';

import { CardBioproductComponent } from './Components/card-bioproduct/card-bioproduct.component';
import { BioproductComponent } from './Components/bioproduct/bioproduct.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { ProductManagementComponent } from './Components/product-management/product-management.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MapInfoDisplayComponent,
    HomeComponent,
    FeedbackComponent,
    LoginComponent,
    CarouselComponent,
    InfoComponent,
    CardBioproductComponent,
    BioproductComponent,
    FooterComponent,
    UserManagementComponent,
    UserEditComponent,
    ProductManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PointsOfSalesCrudModule,
    UsersCrudModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
