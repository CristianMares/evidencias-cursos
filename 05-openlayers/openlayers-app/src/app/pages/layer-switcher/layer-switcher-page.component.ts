import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { StyleLike } from 'ol/style/Style';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { MapComponent } from '../../components/map/map.component';
import { estiloManzanas, estiloPredios, estiloVias } from './estilos-catastro';

// Carga un archivo GeoJSON como capa vectorial con titulo (para el selector de capas) y estilo.
const capaVectorial = (url: string, title: string, style: StyleLike) =>
  new VectorLayer({
    source: new VectorSource({ url, format: new GeoJSON() }),
    style,
    properties: { title },
  });

@Component({
  selector: 'app-layer-switcher-page',
  imports: [MapComponent],
  template: `
    <h2>Selector de capas (ol-ext)</h2>
    <p class="text-muted">
      Capas base (excluyentes) y capas tematicas (manzanas, predios y vias) que se pueden mostrar, ocultar,
      reordenar y hacerles transparencia. Acercate para ver las etiquetas. Los datos son inventados, solo para
      practicar.
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

  // El orden importa: la primera capa queda abajo y las siguientes encima.
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
      capaVectorial('data/manzanas.geojson', 'Manzanas', estiloManzanas),
      capaVectorial('data/predios.geojson', 'Predios', estiloPredios),
      capaVectorial('data/vias.geojson', 'Vias', estiloVias),
    ],
    view: new View({
      center: fromLonLat([-68.1325, -16.496]),
      zoom: 17,
    }),
  });

  constructor() {
    this.map.addControl(
      new LayerSwitcher({
        mouseover: true,
        show_progress: true,
        reordering: true,
        oninfo: (layer) => this.info.set(layer.get('title')),
      }),
    );
  }
}
