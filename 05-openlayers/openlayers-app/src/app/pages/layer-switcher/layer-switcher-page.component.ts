import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

@Component({
  selector: 'app-layer-switcher-page',
  imports: [MapComponent],
  template: `
    <h2>Selector de capas (ol-ext)</h2>
    <p class="text-muted">
      Control LayerSwitcher de la libreria de terceros ol-ext. Pasa el mouse sobre el icono de capas (arriba a la
      derecha). Las capas base son excluyentes: solo una se ve a la vez.
    </p>
    @if (info()) {
      <p>Informacion de la capa: <strong>{{ info() }}</strong></p>
    }

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class LayerSwitcherPageComponent {
  info = signal('');

  // title: nombre que muestra el selector. baseLayer: true: capa base (solo una visible a la vez).
  // En TypeScript estas propiedades extra se pasan por "properties".
  map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
        properties: { title: 'OpenStreetMap', baseLayer: true },
      }),
      new TileLayer({
        visible: false,
        source: new XYZ({
          url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
          maxZoom: 17,
          attributions: 'Datos © OpenStreetMap, SRTM | Estilo © OpenTopoMap (CC-BY-SA)',
        }),
        properties: { title: 'Topografico', baseLayer: true },
      }),
      new TileLayer({
        visible: false,
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19,
          attributions: 'Imagenes © Esri, Maxar, Earthstar Geographics',
        }),
        properties: { title: 'Satelite', baseLayer: true },
      }),
    ],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 12,
    }),
  });

  constructor() {
    this.map.addControl(
      new LayerSwitcher({
        mouseover: true,
        show_progress: true,
        oninfo: (layer) => this.info.set(layer.get('title')),
      }),
    );
  }
}
