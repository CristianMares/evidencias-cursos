import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

@Component({
  selector: 'app-vista-de-inicio-page',
  imports: [MapComponent],
  template: `
    <h2>Vista de inicio</h2>
    <p class="text-muted">Mapa basico con OpenStreetMap, centrado en La Paz, Bolivia.</p>
    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class VistaDeInicioPageComponent {
  map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
    }),
  });
}
