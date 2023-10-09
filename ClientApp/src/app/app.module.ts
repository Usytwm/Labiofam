import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { SharedModule } from './Shared/shared.module';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { MapInfoDisplayComponent } from './Components/map-info-display/map-info-display.component';
import { HomeComponent } from './Components/home/home.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { LoginComponent } from './Components/login/login.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { ListOfPeopleComponent } from './Components/list-of-people/list-of-people.component';
import { InfoComponent } from './Components/info/info.component';
import { EditPeopleComponent } from './Components/edit-people/edit-people.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MapInfoDisplayComponent,
    HomeComponent,
    FeedbackComponent,
    LoginComponent,
    CarouselComponent,
    ListOfPeopleComponent,
    InfoComponent,
    EditPeopleComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
