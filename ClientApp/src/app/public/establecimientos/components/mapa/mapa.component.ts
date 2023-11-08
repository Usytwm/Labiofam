import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  Map,
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
} from 'maplibre-gl';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  private initialState = { lng: -79.481167, lat: 21.521757, zoom: 5.8 };
  private apiKey = 'tbjXu9R4kQGNcVpje2Yg';
  private mapStyle = `https://api.maptiler.com/maps/streets-v2/style.json?key=${this.apiKey}`;
  private map?: Map;
  private markers: Marker[] = [];
  private puntosDeVenta?: Point_of_Sales[];

  @ViewChild('map')
  private mapContainerElement!: ElementRef<HTMLElement>;

  constructor(private _puntos_de_ventaService: PointsOfSalesService) {}

  ngOnInit(): void {
    this._puntos_de_ventaService.getAll().subscribe((data) => {
      this.puntosDeVenta = data;
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

    this.map.on('load', () => {
      if (this.map) {
        const geojson = this.createGeojson(this.puntosDeVenta);
        this.map.addSource('places', {
          type: 'geojson',
          data: geojson,
        });
        // Añade una capa con los marcadores al mapa
        this.map.addLayer({
          id: 'places',
          type: 'symbol',
          source: 'places',
          layout: {
            'icon-image': '{icon}', // Aquí puedes especificar la imagen que quieres usar para los marcadores
            'icon-allow-overlap': true,
          },
        });
        this.viewGeojson(geojson);

        let filterInputElement = document.getElementById(
          'filter-input'
        ) as HTMLInputElement;

        filterInputElement.addEventListener('input', (e) => {
          const value = (e.target as HTMLInputElement).value
            .trim()
            .toLowerCase();

          /// Actualiza el filtro de la capa de marcadores en el mapa
          this.map?.setFilter('places', ['==', ['get', 'nombre'], value]);
          this.map?.setFilter('places', ['==', ['get', 'productos'], value]);
          // Actualiza los datos de la capa
          geojson.features = this.puntosDeVenta!.filter((punto) =>
            punto.name!.toLowerCase().includes(value)
          ).map((punto) => ({
            type: 'Feature',
            properties: {
              description: `
              <div data-aos="fade-right" data-aos-duration="500">
                <div class="card" style="height: 15rem !important ;  width: 17rem !important; transition: 0.7s; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); border:none;">
                  <div class="card-body" >
                    <h3 class="card-title">${punto.name}</h3>
                    <ul style=" text-align: left">
                      <li><strong>Dirección:</strong> ${punto.address}</li>
                      <li><strong>Municipio:</strong> ${punto.municipality}</li>
                      <li><strong>Provincia:</strong> ${punto.province}</li>
                      <li><strong>Productos disponibles:</strong> coquisgv sbdcjh bcshjac sdbhc sbdhj</li>
                    </ul>
                  <a href="point-of-sales/details/${punto.point_ID}" class="btn btn-primary">Ver mas</a>
                </div>
              </div>
    `,
              nombre: punto.name,
              icon: 'theatre',
            },
            geometry: {
              type: 'Point',
              coordinates: [punto.longitude, punto.latitude],
            },
          }));
          console.log(geojson);
          this.viewGeojson(geojson);
        });

        this.map.on('mouseenter', 'places', () => {
          this.map!.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', 'places', () => {
          this.map!.getCanvas().style.cursor = '';
        });
      }
    });
  }

  createGeojson(puntosDeVenta?: Point_of_Sales[]) {
    return {
      type: 'FeatureCollection',
      features: puntosDeVenta?.map((punto) => ({
        type: 'Feature',
        properties: {
          description: `
                <div data-aos="fade-right" data-aos-duration="500">
                  <div class="card" style="height: 15rem ;  width: 17rem !important; transition: 0.7s; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); border:none;">
                    <div class="card-body" >
                      <h3 class="card-title">${punto.name}</h3>
                      <ul style=" text-align: left">
                        <li><strong>Dirección:</strong> ${punto.address}</li>
                        <li><strong>Municipio:</strong> ${punto.municipality}</li>
                        <li><strong>Provincia:</strong> ${punto.province}</li>
                        <li><strong>Productos disponibles:</strong> coquisgv sbdcjh bcshjac sdbhc sbdhj</li>
                      </ul>
                    <a href="point-of-sales/details/${punto.point_ID}" class="btn btn-primary">Ver mas</a>
                  </div>
                </div>
      `,
        },
        geometry: {
          type: 'Point',
          coordinates: [punto.longitude, punto.latitude],
        },
      })),
    };
  }

  viewGeojson(geojson: any): void {
    // Elimina los marcadores existentes
    this.markers.forEach((marker) => marker.remove());
    // Vacía el array de marcadores
    this.markers = [];
    geojson.features.forEach((marker: any) => {
      const popup = new Popup();
      if (this.map) {
        const mapMarker = new Marker()
          .setLngLat([
            marker.geometry.coordinates[0],
            marker.geometry.coordinates[1],
          ])
          .setPopup(
            popup.setHTML(marker.properties.description).setMaxWidth('500px')
          )
          .addTo(this.map);
        this.markers.push(mapMarker);
      }
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
  applyFilter(filterValue: string) {
    // Aquí puedes filtrar tus datos del mapa basándote en filterValue
    // y luego actualizar tu mapa
  }
}
