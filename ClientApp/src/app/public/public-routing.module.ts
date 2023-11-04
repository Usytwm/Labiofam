import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/components/home/home.component';
import { MapaComponent } from './mapa/components/mapa/mapa.component';
import { ServicesComponent } from './servicios/components/servicios/servicios.component';
import { ContactosComponent } from './contactos/components/contactos/contactos.component';
import { InfoPOSComponent } from '../Components/info-POS/info.component';

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
        path: 'map',
        component: MapaComponent,
      },
      {
        path: 'map/details/:id',
        component: InfoPOSComponent,
      },
      {
        path: 'Services',
        component: ServicesComponent,
      },
      {
        path: 'Contact',
        component: ContactosComponent,
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
