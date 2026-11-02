import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

// Cada capa raster es un TileLayer: una cuadricula de imagenes (mosaicos) que OpenLayers une.
const capas = {
  osm: new TileLayer({ source: new OSM(), visible: true }),
  // XYZ: el servidor entrega cada imagen segun su columna x, fila y y nivel de zoom z.
  topo: new TileLayer({
    visible: false,
    source: new XYZ({
      url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      maxZoom: 17,
      attributions: 'Datos © OpenStreetMap, SRTM | Estilo © OpenTopoMap (CC-BY-SA)',
      // false: la atribucion queda siempre visible.
      attributionsCollapsible: false,
    }),
  }),
  satelite: new TileLayer({
    visible: false,
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19,
      attributions: 'Imagenes © Esri, Maxar, Earthstar Geographics',
      attributionsCollapsible: false,
    }),
  }),
};

type CapaBase = keyof typeof capas;

@Component({
  selector: 'app-raster-page',
  imports: [MapComponent],
  template: `
    <h2>Datos raster</h2>
    <p class="text-muted">
      Capas base de mosaicos (tiles). Abre las herramientas de desarrollo, pestana Network, y mira como se piden las
      imagenes al servidor al mover el mapa.
    </p>

    <div class="mb-3">
      @for (opcion of opciones; track opcion.id) {
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="capaBase"
            [id]="opcion.id"
            [checked]="activa() === opcion.id"
            (change)="elegir(opcion.id)"
          />
          <label class="form-check-label" [for]="opcion.id">{{ opcion.nombre }}</label>
        </div>
      }
    </div>

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class RasterPageComponent {
  opciones: { id: CapaBase; nombre: string }[] = [
    { id: 'osm', nombre: 'OpenStreetMap' },
    { id: 'topo', nombre: 'Topografico (OpenTopoMap)' },
    { id: 'satelite', nombre: 'Satelite (Esri)' },
  ];

  activa = signal<CapaBase>('osm');

  map = new Map({
    layers: [capas.osm, capas.topo, capas.satelite],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 12,
    }),
  });

  // Solo una capa base visible a la vez.
  elegir(id: CapaBase) {
    this.activa.set(id);
    (Object.keys(capas) as CapaBase[]).forEach((clave) => capas[clave].setVisible(clave === id));
  }
}
