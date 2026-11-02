import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat, transformExtent } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

interface Ciudad {
  nombre: string;
  lon: number;
  lat: number;
}

// Extension de Bolivia aproximada: [oeste, sur, este, norte] en EPSG:4326.
const BOLIVIA_EXTENT = [-69.7, -22.95, -57.4, -9.6];

@Component({
  selector: 'app-vista-de-inicio-page',
  imports: [MapComponent],
  template: `
    <h2>Vista de inicio</h2>
    <p class="text-muted">
      Posicion inicial, zoom, proyeccion y extension del mapa. El mapa no deja salirse de Bolivia ni pasar de los
      niveles de zoom 5 a 18.
    </p>

    <ul class="list-inline">
      <li class="list-inline-item">Proyeccion: <strong>{{ projection }}</strong></li>
      <li class="list-inline-item">Centro (lon, lat): <strong>{{ center() }}</strong></li>
      <li class="list-inline-item">Zoom: <strong>{{ zoom() }}</strong></li>
    </ul>

    <div class="mb-3">
      @for (ciudad of ciudades; track ciudad.nombre) {
        <button class="btn btn-outline-primary me-2" (click)="irA(ciudad)">{{ ciudad.nombre }}</button>
      }
    </div>

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class VistaDeInicioPageComponent {
  ciudades: Ciudad[] = [
    { nombre: 'La Paz', lon: LA_PAZ.lon, lat: LA_PAZ.lat },
    { nombre: 'Santa Cruz', lon: -63.1812, lat: -17.7833 },
    { nombre: 'Sucre', lon: -65.2619, lat: -19.0333 },
  ];

  map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
      // extent: limita hasta donde se puede mover el mapa. minZoom y maxZoom limitan el zoom.
      extent: transformExtent(BOLIVIA_EXTENT, 'EPSG:4326', 'EPSG:3857'),
      minZoom: 5,
      maxZoom: 18,
    }),
  });

  projection = this.map.getView().getProjection().getCode();

  center = signal('');
  zoom = signal(0);

  constructor() {
    this.updateInfo();
    this.map.on('moveend', () => this.updateInfo());
  }

  irA(ciudad: Ciudad) {
    this.map.getView().animate({ center: fromLonLat([ciudad.lon, ciudad.lat]), zoom: 13, duration: 800 });
  }

  private updateInfo() {
    const view = this.map.getView();
    const center = view.getCenter();
    if (center) {
      const [lon, lat] = toLonLat(center);
      this.center.set(`${lon.toFixed(4)}, ${lat.toFixed(4)}`);
    }
    this.zoom.set(Math.round((view.getZoom() ?? 0) * 10) / 10);
  }
}
