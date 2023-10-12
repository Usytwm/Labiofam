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
//import { Map, MapStyle, config } from '@maptiler/sdk';

@Component({
  selector: 'app-map-info-display',
  templateUrl: './map-info-display.component.html',
  styleUrls: ['./map-info-display.component.css'],
})
export class MapInfoDisplayComponent implements AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  puntosDeVenta = [
    {
      id: 1,
      nombre: 'Punto de venta 1',
      imagen: 'url-de-la-imagen-1',
      direccion: 'Dirección 1',
      municipio: 'Municipio 1',
      provincia: 'Provincia 1',
      direccionGeoespacial: { lng: -82.36764, lat: 23.087586 },
      img: '/',
    },
    {
      id: 2,
      nombre: 'Punto de venta 2',
      imagen: 'url-de-la-imagen-2',
      direccion: 'Dirección 2',
      municipio: 'Municipio 2',
      provincia: 'Provincia 2',
      direccionGeoespacial: { lng: -81.103321, lat: 22.911131 },
      img: '/',
    },
    {
      id: 3,
      nombre: 'Punto de venta 3',
      imagen: 'url-de-la-imagen-3',
      direccion: 'Dirección 3',
      municipio: 'Municipio 3',
      provincia: 'Provincia 3',
      direccionGeoespacial: { lng: -79.925037, lat: 22.325472 },
      img: '/',
    },
    {
      id: 4,
      nombre: 'Punto de venta 4',
      imagen: 'url-de-la-imagen-4',
      direccion: 'Dirección 4',
      municipio: 'Municipio 4',
      provincia: 'Provincia 4',
      direccionGeoespacial: { lng: -80.345264, lat: 22.083897 },
      img: '/',
    },
    {
      id: 5,
      nombre: 'Punto de venta 5',
      imagen: 'url-de-la-imagen-5',
      direccion: 'Dirección 5',
      municipio: 'Municipio 5',
      provincia: 'Provincia 5',
      direccionGeoespacial: { lng: -79.540516, lat: 22.002431 },
      img: '/',
    },
    {
      id: 6,
      nombre: 'Punto de venta6',
      imagen: 'url-de-la-imagen-6',
      direccion: 'Direccion6',
      municipio: 'Municipio6',
      provincia: 'Provincia6',
      direccionGeoespacial: { lng: -78.535267, lat: 21.885242 },
      img: '/',
    },
    {
      id: 7,
      nombre: 'Punto de venta7',
      imagen: 'url-de-la-imagen-7',
      direccion: 'Direccion7',
      municipio: 'Municipio7',
      provincia: 'Provincia7',
      direccionGeoespacial: { lng: -77.909046, lat: 21.366935 },
      img: '/',
    },
  ];

  geojson = {
    type: 'FeatureCollection',
    features: this.puntosDeVenta.map((punto) => ({
      type: 'Feature',
      properties: {
        description: ` <div style="text-align: center;">
        <img src="${punto.img}" alt="${punto.nombre}" style="width: 100px; height: auto;">
        <strong>${punto.nombre}</strong>
        <p>${punto.direccion}, ${punto.municipio}, ${punto.provincia}</p>
        <strong>Productos disponibles:</strong>
        <p>coquisgv sbdcjh bcshjac sdbhc sbdhj</p>
        <a href="/productos/${punto.id}">Ver más</a>
      </div>
        `,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          punto.direccionGeoespacial.lng,
          punto.direccionGeoespacial.lat,
        ],
      },
    })),
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const initialState = { lng: -79.481167, lat: 21.521757, zoom: 5.8 };
    const apiKey = 'tbjXu9R4kQGNcVpje2Yg';

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
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
        this.map.addSource('places', {
          type: 'geojson',
          data: this.geojson,
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

        this.geojson.features.forEach((marker) => {
          const popup = new Popup({ className: 'my-class' });
          // Crea un elemento DOM para el marcador
          let el = document.createElement('div');
          el.className = 'marker';
          el.style.cursor = 'pointer';
          if (this.map) {
            // Crea el marcador y añádelo al mapa
            new Marker(el)
              .setLngLat([
                marker.geometry.coordinates[0],
                marker.geometry.coordinates[1],
              ])
              .setPopup(
                popup
                  .setHTML(marker.properties.description)
                  .setMaxWidth('500px')
              )
              .addTo(this.map);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}