import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListOfPeopleComponent } from './Components/list-of-people/list-of-people.component';
import { EditPeopleComponent } from './Components/edit-people/edit-people.component';
import { InfoComponent } from './Components/info/info.component';
import { MapInfoDisplayComponent } from './Components/map-info-display/map-info-display.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listpersons',
    pathMatch: 'full',
  },
  {
    path: 'listpersons',
    component: ListOfPeopleComponent,
  },
  {
    path: 'addpeople',
    component: EditPeopleComponent,
  },
  {
    path: 'info/:id',
    component: InfoComponent,
  },
  {
    path: 'edit/:id',
    component: EditPeopleComponent,
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
