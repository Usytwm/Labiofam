import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
<<<<<<< HEAD
//Nuevos
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
=======
import { MatDividerModule } from '@angular/material/divider';

>>>>>>> 3a7a12664eb36fbfb8d51a0fbc2723aa2de4ef8e
//componentes
import { SpinnerComponent } from '../Components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    SpinnerComponent,
    MatListModule,
    MatProgressSpinnerModule,

    MatSidenavModule,

    MatToolbarModule,



  ],
})
export class SharedModule {}
