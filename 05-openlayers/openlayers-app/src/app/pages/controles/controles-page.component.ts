import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

@Component({
  selector: 'app-controles-page',
  imports: [MapComponent],
  template: `
    <h2>Controles</h2>
    <p class="text-muted">
      Controles por defecto (zoom, rotacion y atribuciones) mas pantalla completa. Para rotar el mapa:
      Shift + Alt y arrastrar.
    </p>
    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class ControlesPageComponent {
  map = new Map({
    // defaults() trae los controles por defecto; extend() agrega los nuevos sin quitarlos.
    controls: defaultControls({
      // Las etiquetas de ayuda del zoom se pueden traducir con zoomOptions.
      zoomOptions: { zoomInTipLabel: 'Acercar', zoomOutTipLabel: 'Alejar' },
    }).extend([
      // className: clase CSS propia para cambiar la posicion (ver styles.css).
      new FullScreen({ className: 'ol-full-screen-izq', tipLabel: 'Pantalla completa' }),
    ]),
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
    }),
  });
}
