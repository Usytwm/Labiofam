import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/components/home/home.component';
import { MapaComponent } from './mapa/components/mapa/mapa.component';
import { ContactosComponent } from './contactos/components/contactos/contactos.component';
import { BioproductosComponent } from './bioproductos/components/bioproductos/bioproductos.component';
import { SidenavComponent } from '../admin/components/sidenav/sidenav.component';


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
        path: 'contact',
        component: ContactosComponent
      },
      {
        path: 'bioproduct',
        component: BioproductosComponent
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
