import { afterNextRender, Component, ElementRef, viewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, FullScreen, MousePosition, ScaleLine, ZoomToExtent } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { fromLonLat, transformExtent } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

// Extension inicial (La Paz) en EPSG:4326: [oeste, sur, este, norte].
const EXTENSION_INICIAL = [-68.2, -16.57, -68.03, -16.43];

@Component({
  selector: 'app-controles-page',
  imports: [MapComponent],
  template: `
    <h2>Controles</h2>
    <p class="text-muted">
      Controles por defecto, pantalla completa, escala, zoom a la extension inicial y posicion del mouse
      (esta fuera del mapa). Para rotar el mapa: Shift + Alt y arrastrar.
    </p>
    <div class="map-container">
      <app-map [map]="map" />
    </div>
    <div class="mt-2">Posicion del mouse (lon, lat): <strong #posicion></strong></div>
  `,
})
export default class ControlesPageComponent {
  private posicion = viewChild.required<ElementRef<HTMLElement>>('posicion');

  map = new Map({
    controls: defaultControls({
      zoomOptions: { zoomInTipLabel: 'Acercar', zoomOutTipLabel: 'Alejar' },
    }).extend([
      new FullScreen({ className: 'ol-full-screen-izq', tipLabel: 'Pantalla completa' }),
      new ScaleLine({ units: 'metric' }),
      // Vuelve a la extension inicial desde cualquier parte del mapa.
      new ZoomToExtent({
        className: 'ol-zoom-extent-inicio',
        label: 'Inicio',
        tipLabel: 'Volver al inicio',
        extent: transformExtent(EXTENSION_INICIAL, 'EPSG:4326', 'EPSG:3857'),
      }),
    ]),
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 13,
    }),
  });

  constructor() {
    // El control con target necesita que el elemento ya exista, por eso se agrega despues de renderizar.
    afterNextRender(() => {
      this.map.addControl(
        new MousePosition({
          projection: 'EPSG:4326',
          coordinateFormat: createStringXY(4),
          target: this.posicion().nativeElement,
          className: 'posicion-mouse',
        }),
      );
    });
  }
}
