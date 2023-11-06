import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/components/home/home.component';
import { MapaComponent } from './establecimientos/components/mapa/mapa.component';
import { ServicesComponent } from './servicios/components/servicios/servicios.component';
import { ContactosComponent } from './contactos/components/contactos/contactos.component';
import { InfoPOSComponent } from './establecimientos/components/info-point-of-sale/info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'point-of-sales',
        component: MapaComponent,
      },
      {
        path: 'point-of-sales/details/:id',
        component: InfoPOSComponent,
      },
      {
        path: 'Services',
        component: ServicesComponent,
      },
      {
        path: 'dashboard',
        component: SidenavComponent,
      },
      // otras rutas que deben mostrarse dentro de PublicComponent
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
