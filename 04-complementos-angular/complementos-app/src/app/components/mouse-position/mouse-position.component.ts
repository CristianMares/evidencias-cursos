import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormatterService } from '../../services/coordinate-formatter.service';

@Component({
  selector: 'app-mouse-position',
  template: '',
  styles: ['.mouseposition-control { font-family: monospace; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit, OnDestroy {
  map = input.required<Map>();
  // x = longitud, y = latitud (EPSG:4326). Con la proyeccion del mapa (EPSG:3857) serian metros.
  positionTemplate = input('{x}, {y}');
  projection = input('EPSG:4326');

  private elementRef = inject(ElementRef);
  private coordinateFormatter = inject(CoordinateFormatterService);
  private control?: ControlMousePosition;

  ngOnInit() {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      projection: this.projection(),
      coordinateFormat: (coordinates) =>
        coordinates
          ? this.coordinateFormatter.numberCoordinates(coordinates, 4, this.positionTemplate())
          : '',
      target: this.elementRef.nativeElement,
    });
    this.map().addControl(this.control);
  }

  ngOnDestroy() {
    if (this.control) {
      this.map().removeControl(this.control);
    }
  }
}
