import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent],
  template: `
    <h2>Mapa</h2>
    <hr />
    <app-map />
  `,
})
export default class MapPageComponent {}
