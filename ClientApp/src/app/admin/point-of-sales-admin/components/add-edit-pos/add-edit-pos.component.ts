import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
@Component({
  selector: 'app-add-edit-pos',
  templateUrl: './add-edit-pos.component.html',
  styleUrls: ['./add-edit-pos.component.css'],
})
export class AddEditPosComponent implements OnInit, AfterViewInit {
  provinces: any;
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
      // console.log(photo);
      photo.text().then((text) => {
        this.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
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

  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    municipality: ['', Validators.required],
    province: ['', Validators.required],
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

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _point_of_sales_service: PointsOfSalesService,
    private router: Router,
    private route: ActivatedRoute,
    private _fotoservice: FileService,
    private _jsonservice: JsonService
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 'null') {
      this.operacion = 'Editar';
      this.getPoint(this.id);
    }
    this.get_Json_Provinces();
  }

  get_Json_Provinces(): void {
    this._jsonservice.getPJson().subscribe((data) => {
      console.log(data);

      // this.provinces = data;
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
        municipality: data.municipality,
        province: data.province,
        latitude: data.latitude,
        longitude: data.longitude,
      });
      if (data.image) {
        this.getPhoto(data.image);
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
      this.loading = false;
    });
  }

  editPoint() {
    this.loading = true;
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
  }

  addPoint() {
    console.log(this.newPoint());

    this._point_of_sales_service.add(this.newPoint()).subscribe((data) => {
      this.snackBar.open('Agregado con éxito', 'cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
      });
      this.router.navigate(['/dashboard/points-of-sales-admin']);
    });
  }

  newPoint(): Point_of_Sales {
    const imagePath = this.imagePreview!;
    console.log(imagePath);

    return {
      name: this.form.value.name!,
      address: this.form.value.address!,
      municipality: this.form.value.municipality!,
      province: this.form.value.province!,
      latitude: this.form.value.latitude!,
      longitude: this.form.value.longitude!,
      image: imagePath,
    };
  }
}
