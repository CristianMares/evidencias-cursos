import { Component, signal } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
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
}
