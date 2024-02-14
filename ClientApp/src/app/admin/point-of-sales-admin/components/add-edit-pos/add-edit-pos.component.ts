import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import {
  Map,
  NavigationControl,
  Marker,
  GeolocateControl,
  FullscreenControl,
  LngLat,
} from 'maplibre-gl';
import { PointsOfSalesService } from 'src/app/Services/EntitiesServices/points-of-sales.service';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/Services/FilesService/File.service';
import { JsonService } from 'src/app/Services/FilesService/Json.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/Interfaces/Product';
import { ProductPosFilterService } from 'src/app/Services/FilterServices/product-pos-filter.service';
import { ProductService } from 'src/app/Services/EntitiesServices/product.service';
import { EMPTY, catchError, forkJoin, of, switchMap } from 'rxjs';
import { ProductPosService } from 'src/app/Services/RelationsServices/product-pos.service';
@Component({
  selector: 'app-add-edit-pos',
  templateUrl: './add-edit-pos.component.html',
  styleUrls: ['./add-edit-pos.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddEditPosComponent implements OnInit, AfterViewInit {
  provinces: any;
  municipiosDisponibles: string[] = [];
  availableProducts: Product[] = [];
  selectedforRemove?: Product[];
  selectedforadd?: Product[];
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const imagename = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
    }
  }
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this._fotoservice.uploadPhoto(file).subscribe((response) => {
        // Maneja la respuesta del servidor aquí
        this.imagePreview = response;
        this.getPhoto(this.imagePreview);
      });
    }
  }

  getPhoto(photoName: string) {
    this._fotoservice.getPhoto(photoName).subscribe((photo) => {
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }

  products: Product[] = [];
  selectedProducts: Product[] = [];
  productsRowSpan?: number;

  selectProduct(product: Product) {
    if (this.isSelected(product)) {
      this.selectedProducts = this.selectedProducts.filter(
        (p) => p !== product
      );
    } else {
      this.selectedProducts.push(product);
    }
  }

  isSelected(product: Product) {
    return this.selectedProducts.some(
      (selectedProduct) => selectedProduct.id === product.id
    );
  }

  saveSelection(closeModal: () => void) {
    this.calculateRowSpan();
    // Esta función se llama cuando se presiona 'Save' en el modal.
    // Aquí puedes implementar la lógica para cerrar el modal si es necesario
    // y actualizar cualquier estado relacionado.
    closeModal();
    console.log(this.selectedProducts);
  }

  removeSelectedProduct(product: Product) {
    // Lógica para quitar un producto de la lista de seleccionados
    this.selectedProducts = this.selectedProducts.filter((p) => p !== product);
    this.calculateRowSpan();
    console.log(this.selectedProducts);
  }

  image?: string;
  imagePreview?: string;
  markerLngLat?: LngLat;
  marker?: Marker;
  private initialState =
    window.innerWidth > 768 ? environment.desktopView : environment.mobileView;

  private apiKey = environment.apiKey;
  private mapStyle = `${environment.mapStyle}${this.apiKey}`;
  private map?: Map;
  loading = false;
  id: string;
  operacion = 'Agregar';
  point?: Point_of_Sales;
  @ViewChild('map')
  private mapContainerElement!: ElementRef<HTMLElement>;
  provincias: { [key: string]: string[] } = {};

  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],

    latitude: [
      0,
      [
        Validators.required,
        Validators.pattern(
          '^[-+]?((?:180(?:\\.0+)?|(?:(?:1[0-7]\\d)|(?:[1-9]?\\d))(?:\\.\\d+)?))'
        ),
      ],
    ],
    longitude: [
      0,
      [
        Validators.required,
        Validators.pattern(
          '^[-+]?((?:180(?:\\.0+)?|(?:(?:1[0-7]\\d)|(?:[1-9]?\\d))(?:\\.\\d+)?))'
        ),
      ],
    ],
  });
  ProvinceControl = new FormControl<string | null>(null, Validators.required);
  MunicipioControl = new FormControl<string | null>(null, Validators.required);
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _point_of_sales_service: PointsOfSalesService,
    private router: Router,
    private route: ActivatedRoute,
    private _fotoservice: FileService,
    private _jsonservice: JsonService,
    private _filterService: ProductPosFilterService,
    private _productService: ProductService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _productposService: ProductPosService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  open(content: any) {
    this.modalService.open(content, { scrollable: true });
    this.availableProducts = this.products.filter(
      (p) =>
        !this.selectedProducts.some(
          (selectedProduct) => selectedProduct.id === p.id
        )
    );
  }
  calculateRowSpan() {
    // Calcula el rowspan. Asumimos que cada fila tiene 3 productos.
    const length = this.selectedProducts.length;

    // Comprueba si la longitud es divisible por 2
    if (length % 2 === 0) {
      // Si es divisible por 2, se mantiene el valor
      this.productsRowSpan = length;
    } else {
      // Si no es divisible por 2, se suma 1
      this.productsRowSpan = length + 1;
    }
  }

  ngOnInit(): void {
    this.getProducts();
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getPoint(this.id);
    }
    this.get_Json_Provinces();
    this.MunicipioControl.valueChanges.subscribe((municipio) => {
      for (let provincia in this.provincias) {
        if (this.provincias[provincia].includes(municipio!)) {
          this.ProvinceControl.setValue(provincia);
          break;
        }
      }
    });

    this.ProvinceControl.valueChanges.subscribe((provincia) => {
      if (provincia) {
        this.municipiosDisponibles = this.getvalues(provincia);
      } else {
        this.municipiosDisponibles = this.getvalues('');
        this.MunicipioControl.setValue(null);
      }
    });
    this.calculateRowSpan();
  }

  getProducts() {
    this._productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  get_Json_Provinces(): void {
    this._jsonservice.getPJson().subscribe((data) => {
      data.forEach((provincia) => {
        this.provincias[provincia.nombre] = provincia.municipios;
      });
      this.municipiosDisponibles = Object.values(this.provincias).flat();
    });
  }

  ngAfterViewInit() {
    this.map = new Map({
      container: this.mapContainerElement.nativeElement,
      style: this.mapStyle,
      center: [this.initialState.lng, this.initialState.lat],
      zoom: this.initialState.zoom,
    });
    this.map.addControl(new NavigationControl(), 'top-right');
    this.map.addControl(new FullscreenControl(), 'bottom-right');
    this.map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    if (this.operacion === 'Agregar') {
      this.form.patchValue({
        latitude: 23.113592,
        longitude: -82.366592,
      });
      this.marker = new Marker({
        draggable: true,
      })
        .setLngLat([-82.366592, 23.113592])
        .addTo(this.map!);
      this.marker.on('dragend', () => {
        this.form.patchValue({
          latitude: this.marker!.getLngLat().lat,
          longitude: this.marker!.getLngLat().lng,
        });
        this.markerLngLat = this.marker!.getLngLat();
      });
    }
  }

  getPoint(id: string) {
    this.loading = true;
    this._point_of_sales_service.get(id).subscribe((data) => {
      this.point = data;
      this.form.patchValue({
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      });
      this.ProvinceControl.setValue(data.province!);
      this.MunicipioControl.setValue(data.municipality!);
      if (data.image) {
        this.getPhoto(data.image);
        this.imagePreview = data.image;
      }
      this.marker = new Marker({
        draggable: true,
      })
        .setLngLat([data.longitude, data.latitude])
        .addTo(this.map!);
      this.marker.on('dragend', () => {
        this.form.patchValue({
          latitude: this.marker!.getLngLat().lat,
          longitude: this.marker!.getLngLat().lng,
        });
        this.markerLngLat = this.marker!.getLngLat();
      });
      this._filterService.getType2byType1(id).subscribe((data) => {
        this.selectedProducts = data;
        this.selectedforRemove = [...this.selectedProducts];
        this.selectedforadd = [...this.selectedProducts];
        this.calculateRowSpan();
      });
      this.loading = false;
    });
  }

  editPoint() {
    this.loading = true;

    // Eliminar productos existentes
    this.updateAssociatedProducts();
  }

  updateAssociatedProducts() {
    this.selectedforRemove = this.selectedforRemove!.filter(
      (product) => !this.selectedProducts.includes(product)
    );

    if (this.selectedforRemove.length > 0) {
      const deleteObservables = this.selectedforRemove.map((product) =>
        this._productposService.removePP(product.id!, this.id)
      );

      forkJoin(deleteObservables).subscribe(
        () => {
          this.addProducts();
        },
        (error) => {
          console.error('Error al eliminar productos', error);
          this.loading = false;
        }
      );
    } else {
      this.addProducts();
    }
  }

  addProducts() {
    const newProducts = this.selectedProducts.filter(
      (product) => !this.selectedforadd!.includes(product)
    );

    if (newProducts.length > 0) {
      const addProductObservables = newProducts.map((newProduct) =>
        this._productposService.addPP(this.id, newProduct.id!)
      );

      forkJoin(addProductObservables).subscribe(
        () => {
          this.finishEditingPoint();
        },
        (error) => {
          console.error('Error al agregar productos', error);
          this.loading = false;
        }
      );
    } else {
      this.finishEditingPoint();
    }
  }

  finishEditingPoint() {
    this._point_of_sales_service
      .edit(this.id, this.newPoint())
      .subscribe(() => {
        this.snackBar.open('Editado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.loading = false;
        this.router.navigate(['/dashboard/points-of-sales-admin']);
      });
    // Acciones finales después de editar el punto de venta y actualizar productos
    // Punto de venta editado con éxito
    // this.snackBar.open('Editado con éxito', 'cerrar', {
    //   duration: 3000,
    //   horizontalPosition: 'right',
    // });
    // this.loading = false;
    // this.router.navigate(['/dashboard/points-of-sales-admin']);
  }

  addPoint() {
    this._point_of_sales_service
      .add(this.newPoint())
      .pipe(
        switchMap((data) => {
          return this._point_of_sales_service.getByName(this.newPoint().name!);
        }),
        catchError((error) => {
          console.error('Ocurrió un error:', error);
          this.snackBar.open('Error al agregar punto de venta', 'cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
          });
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data && data.id) {
          const addProductsObservables = this.selectedProducts.map((product) =>
            this._filterService.addType1ByType2(data.id!, [product])
          );
          forkJoin(addProductsObservables).subscribe(() => {
            // this.snackBar.open('Agregado con éxito', 'cerrar', {
            //   duration: 3000,
            //   horizontalPosition: 'right',
            // });
            console.log('Todos los productos han sido agregados');
            // this.router.navigate(['/dashboard/points-of-sales-admin']);
          });
        }
        this.snackBar.open('Agregado con éxito', 'cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
        });
        this.router.navigate(['/dashboard/points-of-sales-admin']);
      });
  }

  newPoint(): Point_of_Sales {
    const imagePath = this.imagePreview!;
    return {
      name: this.form.value.name!,
      address: this.form.value.address!,
      municipality: this.MunicipioControl.value!,
      province: this.ProvinceControl.value!,
      latitude: this.form.value.latitude!,
      longitude: this.form.value.longitude!,
      image: imagePath,
    };
  }

  getkeys(): string[] {
    return Object.keys(this.provincias);
  }
  getvalues(province: string): string[] {
    if (province === '') {
      return Object.values(this.provincias).flat();
    }
    return this.provincias[province];
  }
}
