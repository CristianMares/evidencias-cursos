import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import Map from 'ol/Map';

// Componente "tonto": no crea el mapa, solo lo dibuja donde esta el componente.
// El padre crea el mapa y se lo pasa por input; asi tambien puede pasarselo a los controles.
@Component({
  selector: 'app-map',
  template: '',
  styles: [':host { display: block; width: 100%; height: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  map = input.required<Map>();

  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    this.map().setTarget(this.elementRef.nativeElement);
  }

  // Al salir de la pagina se suelta el mapa para liberar el DOM y los eventos.
  ngOnDestroy() {
    this.map().setTarget(undefined);
  }
}
