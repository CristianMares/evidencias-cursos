import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { Modo, MODOS } from './estilos';

@Component({
  selector: 'app-estilos-page',
  imports: [MapComponent],
  template: `
    <h2>Estilos de datos vectoriales</h2>
    <p class="text-muted">
      Los mismos datos (2 puntos, 3 lineas y 3 poligonos de La Paz) con distintos estilos.
    </p>

    <div class="mb-3">
      @for (opcion of modos; track opcion.id) {
        <button
          class="btn me-2 mb-2"
          [class.btn-primary]="modo() === opcion.id"
          [class.btn-outline-primary]="modo() !== opcion.id"
          (click)="elegir(opcion.id)"
        >
          {{ opcion.nombre }}
        </button>
      }
    </div>

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class EstilosPageComponent {
  modos = MODOS;
  modo = signal<Modo>('defecto');

  layer = new VectorLayer({
    source: new VectorSource({ url: 'data/features-demo.geojson', format: new GeoJSON() }),
  });

  map = new Map({
    layers: [new TileLayer({ source: new OSM() }), this.layer],
    view: new View({
      center: fromLonLat([-68.1305, -16.5033]),
      zoom: 15,
    }),
  });

  elegir(id: Modo) {
    this.modo.set(id);
    // setStyle(undefined) vuelve al estilo por defecto de OpenLayers.
    this.layer.setStyle(MODOS.find((m) => m.id === id)?.estilo);
  }
}
