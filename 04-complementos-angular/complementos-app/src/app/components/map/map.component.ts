import { AfterViewInit, Component, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

// Valores CSS por defecto, como en el componente de google maps.
const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '500px';

// Si llega un numero se toma como pixeles; si llega un texto (100%, 30rem) se deja igual.
const toCssSize = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);

@Component({
  selector: 'app-map',
  template: `<div #map></div>`,
  styles: [':host { display: block; }'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  lat = input(-34.6037);
  lng = input(-58.3816);
  zoom = input(16);
  width = input<string | number>(DEFAULT_WIDTH);
  height = input<string | number>(DEFAULT_HEIGHT);

  private mapElement = viewChild.required<ElementRef<HTMLDivElement>>('map');
  private map?: Map;

  constructor() {
    // Si cambian lat, lng o zoom despues de crear el mapa, se mueve la vista.
    effect(() => {
      const center = fromLonLat([this.lng(), this.lat()]);
      const zoom = this.zoom();
      this.map?.getView().animate({ center, zoom, duration: 500 });
    });
  }

  // Se usa ngAfterViewInit para estar seguros de que el div ya existe en el DOM.
  ngAfterViewInit() {
    const element = this.mapElement().nativeElement;

    // OpenLayers necesita el tamano de la caja antes de crear el mapa.
    element.style.width = toCssSize(this.width());
    element.style.height = toCssSize(this.height());

    this.map = new Map({
      target: element,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        // OpenLayers no usa lat/lng directamente: fromLonLat las proyecta (primero longitud).
        center: fromLonLat([this.lng(), this.lat()]),
        zoom: this.zoom(),
      }),
    });
  }

  // Al salir de la pagina se suelta el mapa para liberar el DOM y los eventos.
  ngOnDestroy() {
    this.map?.setTarget(undefined);
  }
}
