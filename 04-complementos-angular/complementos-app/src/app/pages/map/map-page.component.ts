import { Component, effect, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { MousePositionComponent } from '../../components/mouse-position/mouse-position.component';
import { ScalelineComponent } from '../../components/scaleline/scaleline.component';

interface Place {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, ScalelineComponent, MousePositionComponent],
  template: `
    <h2>Mapa</h2>
    <hr />

    <div class="mb-3">
      @for (place of places; track place.name) {
        <button class="btn btn-outline-primary me-2" (click)="selected.set(place)">{{ place.name }}</button>
      }
    </div>

    <div class="map-container">
      <app-map [map]="map" />
    </div>

    <footer class="d-flex justify-content-between mt-2">
      <app-scaleline [map]="map" />
      <app-mouse-position [map]="map" positionTemplate="{x}, {y}" />
    </footer>
  `,
  styles: ['.map-container { height: 500px; border: 1px solid #ced4da; }'],
})
export default class MapPageComponent {
  places: Place[] = [
    { name: 'Obelisco', lat: -34.6037, lng: -58.3816, zoom: 16 },
    { name: 'Estadio de Banfield', lat: -34.7439, lng: -58.3937, zoom: 16 },
    { name: 'Sudamerica', lat: -20, lng: -60, zoom: 4 },
  ];

  selected = signal(this.places[0]);

  // La pagina es la duena del mapa: lo crea una vez, sin target (el componente se lo pone).
  map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([this.places[0].lng, this.places[0].lat]),
      zoom: this.places[0].zoom,
    }),
  });

  constructor() {
    effect(() => {
      const place = this.selected();
      this.map.getView().animate({
        center: fromLonLat([place.lng, place.lat]),
        zoom: place.zoom,
        duration: 500,
      });
    });
  }
}
