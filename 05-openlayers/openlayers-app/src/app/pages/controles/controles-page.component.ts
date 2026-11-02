import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, FullScreen, MousePosition, ScaleLine } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

@Component({
  selector: 'app-controles-page',
  imports: [MapComponent],
  template: `
    <h2>Controles</h2>
    <p class="text-muted">
      Controles por defecto (zoom, rotacion y atribuciones), pantalla completa, posicion del mouse y escala.
      Para rotar el mapa: Shift + Alt y arrastrar.
    </p>
    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class ControlesPageComponent {
  map = new Map({
    controls: defaultControls({
      zoomOptions: { zoomInTipLabel: 'Acercar', zoomOutTipLabel: 'Alejar' },
    }).extend([
      new FullScreen({ className: 'ol-full-screen-izq', tipLabel: 'Pantalla completa' }),
      new MousePosition({
        // Muestra lon, lat (EPSG:4326) con 4 decimales en vez de metros con muchos digitos.
        projection: 'EPSG:4326',
        coordinateFormat: createStringXY(4),
      }),
      // Escalimetro: cambia al hacer zoom.
      new ScaleLine({ units: 'metric' }),
    ]),
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
    }),
  });
}
