import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

@Component({
  selector: 'app-vista-de-inicio-page',
  imports: [MapComponent],
  template: `
    <h2>Vista de inicio</h2>
    <p class="text-muted">Posicion inicial, zoom y proyeccion del mapa. Ejemplo centrado en La Paz, Bolivia.</p>

    <ul class="list-inline">
      <li class="list-inline-item">Proyeccion: <strong>{{ projection }}</strong></li>
      <li class="list-inline-item">Centro (lon, lat): <strong>{{ center() }}</strong></li>
      <li class="list-inline-item">Zoom: <strong>{{ zoom() }}</strong></li>
    </ul>

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class VistaDeInicioPageComponent {
  map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      // OpenLayers usa EPSG:3857 (metros). fromLonLat convierte desde EPSG:4326 (lon, lat).
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
    }),
  });

  // Codigo de la proyeccion del mapa: EPSG:3857.
  projection = this.map.getView().getProjection().getCode();

  center = signal('');
  zoom = signal(0);

  constructor() {
    this.updateInfo();
    // moveend se dispara cada vez que el usuario termina de mover o hacer zoom.
    this.map.on('moveend', () => this.updateInfo());
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
