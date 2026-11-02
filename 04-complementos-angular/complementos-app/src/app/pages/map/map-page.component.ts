import { Component, signal } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';

interface Place {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

@Component({
  selector: 'app-map-page',
  imports: [MapComponent],
  template: `
    <h2>Mapa</h2>
    <hr />

    <div class="mb-3">
      @for (place of places; track place.name) {
        <button class="btn btn-outline-primary me-2" (click)="selected.set(place)">{{ place.name }}</button>
      }
    </div>

    <app-map
      [lat]="selected().lat"
      [lng]="selected().lng"
      [zoom]="selected().zoom"
      width="100%"
      [height]="500"
    />
  `,
})
export default class MapPageComponent {
  places: Place[] = [
    { name: 'Obelisco', lat: -34.6037, lng: -58.3816, zoom: 16 },
    { name: 'Estadio de Banfield', lat: -34.7439, lng: -58.3937, zoom: 16 },
    { name: 'Sudamerica', lat: -20, lng: -60, zoom: 4 },
  ];

  selected = signal(this.places[0]);
}
