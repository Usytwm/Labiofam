import { Testimonio } from 'src/app/Interfaces/Testimonios';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//modulos
import { CrudsModule } from '../cruds/cruds.module';
import { SharedModule } from '../../Shared/shared.module';
//componentes
import { TestimoniosAdminComponent } from './components/testimonios-admin/testimonios-admin.component';
import { AddEditTestimoniosComponent } from './components/add-edit-testimonios/testimonios-edit.component';

@NgModule({
  declarations: [TestimoniosAdminComponent, AddEditTestimoniosComponent],
  imports: [CommonModule, CrudsModule, SharedModule, RouterModule],
})
export class TestimoniosAdminModule {}
