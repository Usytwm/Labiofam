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
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
//componentes
import { SpinnerComponent } from '../Components/spinner/spinner.component';
//PrimENG
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { DockModule } from 'primeng/dock';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { ScrollerModule } from 'primeng/scroller';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    //Angular Metrial
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
    MatTabsModule,
    //PrimENG
    OverlayPanelModule,
    PanelModule,
    AccordionModule,
    AvatarModule,
    BreadcrumbModule,
    CardModule,
    ChipModule,
    CommonModule,
    DialogModule,
    ConfirmPopupModule,
    DataViewModule,
    DockModule,
    DropdownModule,
    FieldsetModule,
    FormsModule,
    InputTextModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    PaginatorModule,
    RatingModule,
    ScrollerModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
    ButtonModule,
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
    MatTabsModule,
    SpinnerComponent,
    AvatarModule,
    OverlayPanelModule,
    ButtonModule,
  ],
})
export class SharedModule {}
