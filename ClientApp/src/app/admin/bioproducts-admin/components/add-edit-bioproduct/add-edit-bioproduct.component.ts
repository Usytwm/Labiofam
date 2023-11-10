import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

//Interfaces
import { Role } from 'src/app/Interfaces/Role';
import { Product } from 'src/app/Interfaces/Product';

//Servicios

import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { FilterService } from 'src/app/Services/filter.service';


@Component({
  selector: 'app-add-edit-bioproduct',
  templateUrl: './add-edit-bioproduct.component.html',
  styleUrls: ['./add-edit-bioproduct.component.css']
})
export class AddEditBioproductComponent {

}
