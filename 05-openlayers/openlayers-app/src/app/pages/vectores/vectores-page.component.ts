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

@Component({
  selector: 'app-vectores-page',
  imports: [MapComponent],
  template: `
    <h2>Datos vectoriales</h2>
    <p class="text-muted">
      Un archivo GeoJSON con puntos (ciudades), lineas (carreteras) y poligonos (zonas). Las geometrias son
      aproximadas, solo para practicar. Haz clic en un objeto para ver sus atributos.
    </p>
    <p>
      Objetos cargados: <strong>{{ cantidad() }}</strong>. La capa vectorial solo se ve entre los niveles de zoom 4 y 12
      (zoom actual: <strong>{{ zoom() }}</strong>).
    </p>

    <div class="map-container">
      <app-map [map]="map" />
    </div>

    @if (atributos(); as props) {
      <div class="card card-body mt-3">
        <h5>Atributos del objeto</h5>
        <pre class="mb-0">{{ props }}</pre>
      </div>
    }
  `,
})
export default class VectoresPageComponent {
  cantidad = signal(0);
  atributos = signal<string | null>(null);
  zoom = signal(5.5);

  // El VectorSource guarda los datos (de donde vienen y en que formato)...
  source = new VectorSource({
    url: 'data/bolivia-ejemplo.geojson',
    format: new GeoJSON(),
  });

  // ...y el VectorLayer los muestra en el mapa.
  // minZoom y maxZoom en el layer: fuera de ese rango la capa se oculta (el mapa sigue).
  vectorLayer = new VectorLayer({ source: this.source, minZoom: 4, maxZoom: 12 });

  map = new Map({
    layers: [new TileLayer({ source: new OSM() }), this.vectorLayer],
    view: new View({
      center: fromLonLat([-64.5, -17]),
      zoom: 5.5,
    }),
  });

  constructor() {
    this.map.on('moveend', () => this.zoom.set(Math.round((this.map.getView().getZoom() ?? 0) * 10) / 10));
    this.source.on('featuresloadend', () => this.cantidad.set(this.source.getFeatures().length));

    this.map.on('singleclick', (evento) => {
      const feature = this.map.forEachFeatureAtPixel(evento.pixel, (f) => f);
      if (feature) {
        const { geometry, ...propiedades } = feature.getProperties();
        this.atributos.set(JSON.stringify(propiedades, null, 2));
      } else {
        this.atributos.set(null);
      }
    });
  }
}
