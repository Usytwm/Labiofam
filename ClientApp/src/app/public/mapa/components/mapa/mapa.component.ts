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
              description: `<div style="
              background-color: #ADD8E6; 
              border-radius: 10px; 
              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
              transition: 0.3s; 
              width: 90%; 
              padding: 20px; 
              margin: auto;
          ">
              <img src="${punto.image}" alt="${punto.name}" style="width: 100px; height: auto;">
              <br/>
              <strong>${punto.name}</strong>
              <div  style="text-align: left;">
              <ul>
                  <li><strong>Dirección:</strong> ${punto.address}</li>
                  <li><strong>Municipio:</strong> ${punto.municipality}</li>
                  <li><strong>Provincia:</strong> ${punto.province}</li>
                  <li><strong>Productos disponibles:</strong> coquisgv sbdcjh bcshjac sdbhc sbdhj</li>
              </ul>
              </div>
              <a href="/productos/${punto.point_ID}" style="text-decoration: none; color: black;">Ver más</a>
          </div>
          `, //tengo que cambiar el link
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
          description: `<div style="
          background-color: #ADD8E6; 
          border-radius: 10px; 
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
          transition: 0.3s; 
          width: 90%; 
          padding: 20px; 
          margin: auto;
      ">
          <img src="${punto.image}" alt="${punto.name}" style="width: 100px; height: auto;">
          <br/>
          <strong>${punto.name}</strong>
          <div style="text-align: left;>
          <ul style="justify-content:left">
              <li><strong>Dirección:</strong> ${punto.address}</li>
              <li><strong>Municipio:</strong> ${punto.municipality}</li>
              <li><strong>Provincia:</strong> ${punto.province}</li>
              <li><strong>Productos disponibles:</strong> coquisgv sbdcjh bcshjac sdbhc sbdhj</li>
          </ul>
          </div>
          <a href="/productos/${punto.point_ID}" style="text-decoration: none; color: black;">Ver más</a>
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
      const el = document.createElement('div');
      el.id = 'marker';
      if (this.map) {
        const mapMarker = new Marker(el)
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
}
