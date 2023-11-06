import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/components/home/home.component';
<<<<<<< HEAD
import { MapaComponent } from './mapa/components/mapa/mapa.component';
import { ContactosComponent } from './contactos/components/contactos/contactos.component';
import { BioproductosComponent } from './bioproductos/components/bioproductos/bioproductos.component';
import { SidenavComponent } from '../admin/components/sidenav/sidenav.component';

=======
import { MapaComponent } from './establecimientos/components/mapa/mapa.component';
import { ServicesComponent } from './servicios/components/servicios/servicios.component';
import { ContactosComponent } from './contactos/components/contactos/contactos.component';
import { InfoPOSComponent } from './establecimientos/components/info-point-of-sale/info.component';
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e

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
<<<<<<< HEAD
        path: 'contact',
        component: ContactosComponent
      },
      {
        path: 'bioproduct',
        component: BioproductosComponent
=======
        path: 'point-of-sales/details/:id',
        component: InfoPOSComponent,
      },
      {
        path: 'Services',
        component: ServicesComponent,
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
      },
      {
        path: 'dashboard',
        component: SidenavComponent,
      },
      // otras rutas que deben mostrarse dentro de PublicComponent
    ],
  },
<<<<<<< HEAD

=======
>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
