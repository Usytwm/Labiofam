import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

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

import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating'
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip'
import { ScrollerModule } from 'primeng/scroller';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
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
    ]
})
export class PrimeNgModule { }
