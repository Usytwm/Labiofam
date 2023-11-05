import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { BioproductPageComponent } from './pages/bioproduct-page/bioproduct-page.component';
import { BioproductosComponent } from './components/bioproductos/bioproductos.component';

//localhost:xxxx/bioproduct
const routes: Routes = [
  {
    path: 'bioproduct',
    component: BioproductosComponent,
    children:[
      {path: 'list', component: ListPageComponent },
      {path: ':product_ID', component: BioproductPageComponent },
      {path: '**', redirectTo: 'list' },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioproductosRoutingModule { }
