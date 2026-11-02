import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../../components/map/map.component';
import { LA_PAZ } from '../../shared/la-paz';

type Herramienta = 'punto' | 'linea' | 'poligono';

@Component({
  selector: 'app-interacciones-page',
  imports: [MapComponent],
  template: `
    <h2>Interacciones</h2>
    <p class="text-muted">
      Dibuja puntos, lineas y poligonos. Un clic en el boton activa la herramienta y otro clic la desactiva.
      Para terminar una linea o un poligono haz doble clic.
    </p>

    <div class="mb-3">
      @for (opcion of herramientas; track opcion.id) {
        <button
          class="btn me-2"
          [class.btn-primary]="herramienta() === opcion.id"
          [class.btn-outline-primary]="herramienta() !== opcion.id"
          (click)="seleccionar(opcion.id)"
        >
          {{ opcion.nombre }}
        </button>
      }
    </div>

    <div class="mb-3">
      <button class="btn btn-outline-danger me-2" [disabled]="cantidad() === 0" (click)="limpiar()">Limpiar</button>
      <button class="btn btn-outline-success me-2" [disabled]="cantidad() === 0" (click)="descargar()">
        Descargar GeoJSON
      </button>
      <span class="text-muted">Objetos dibujados: {{ cantidad() }}</span>
    </div>

    <div class="map-container">
      <app-map [map]="map" />
    </div>
  `,
})
export default class InteraccionesPageComponent {
  herramientas: { id: Herramienta; nombre: string }[] = [
    { id: 'punto', nombre: 'Punto' },
    { id: 'linea', nombre: 'Linea' },
    { id: 'poligono', nombre: 'Poligono' },
  ];

  herramienta = signal<Herramienta | null>(null);
  cantidad = signal(0);

  // El VectorSource guarda lo que se dibuja y el VectorLayer lo muestra.
  source = new VectorSource();
  layer = new VectorLayer({ source: this.source });

  // Una interaccion Draw por tipo de geometria, todas apagadas al inicio.
  private interacciones: Record<Herramienta, Draw> = {
    punto: new Draw({ source: this.source, type: 'Point' }),
    linea: new Draw({ source: this.source, type: 'LineString' }),
    poligono: new Draw({ source: this.source, type: 'Polygon' }),
  };

  map = new Map({
    layers: [new TileLayer({ source: new OSM() }), this.layer],
    view: new View({
      center: fromLonLat([LA_PAZ.lon, LA_PAZ.lat]),
      zoom: 14,
    }),
  });

  constructor() {
    // El evento change se dispara cada vez que el source cambia (se agrega o se quita un objeto).
    this.source.on('change', () => this.cantidad.set(this.source.getFeatures().length));

    Object.values(this.interacciones).forEach((interaccion) => {
      interaccion.setActive(false);
      this.map.addInteraction(interaccion);
    });
  }

  // Funciona como un interruptor: al activar una herramienta se apagan las demas.
  seleccionar(id: Herramienta) {
    const nueva = this.herramienta() === id ? null : id;
    this.herramienta.set(nueva);
    (Object.keys(this.interacciones) as Herramienta[]).forEach((clave) =>
      this.interacciones[clave].setActive(clave === nueva),
    );
  }

  limpiar() {
    this.source.clear();
  }

  descargar() {
    // Convierte los objetos dibujados (EPSG:3857) a un texto GeoJSON en lon/lat (EPSG:4326).
    const geojson = new GeoJSON().writeFeatures(this.source.getFeatures(), {
      featureProjection: 'EPSG:3857',
      dataProjection: 'EPSG:4326',
    });

    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([geojson], { type: 'application/geo+json' }));
    enlace.download = 'features.geojson';
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }
}
