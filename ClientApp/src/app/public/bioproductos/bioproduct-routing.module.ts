import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { BioproductPageComponent } from './pages/bioproduct-page/bioproduct-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

//localhost:xxxx/bioproduct
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      {path: 'id', component: BioproductPageComponent },
      {path: 'list', component: ListPageComponent },
      {path: '**', redirectTo: 'list' },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioproductosRoutingModule { }
