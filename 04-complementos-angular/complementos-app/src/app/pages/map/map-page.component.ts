import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent],
  template: `
    <h2>Mapa</h2>
    <hr />
    <!-- Obelisco de Buenos Aires -->
    <app-map [lat]="-34.6037" [lng]="-58.3816" [zoom]="16" width="100%" [height]="500" />
  `,
})
export default class MapPageComponent {}
