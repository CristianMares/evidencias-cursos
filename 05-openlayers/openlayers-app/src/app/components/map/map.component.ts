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
// La pagina crea el mapa y se lo pasa por input.
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

  ngOnDestroy() {
    this.map().setTarget(undefined);
  }
}
