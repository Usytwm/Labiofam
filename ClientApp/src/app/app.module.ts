import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';
import { SeccionAdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { InfoPOSComponent } from './Components/info-POS/info.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//interceptos
import { LoginInterceptor } from './Interceptors/login.interceptor';

@NgModule({
  declarations: [AppComponent, FeedbackComponent, InfoPOSComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    PublicModule,
    SeccionAdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
