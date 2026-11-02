import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import Map from 'ol/Map';
import ControlScaleLine from 'ol/control/ScaleLine';

// Cada control es un componente: aparece en el mapa solo si esta en la plantilla.
@Component({
  selector: 'app-scaleline',
  template: '',
  // OpenLayers crea su HTML sin los atributos de encapsulacion de Angular,
  // por eso hace falta ::ng-deep para poder darle estilo.
  styles: [
    `
      ::ng-deep .ol-scale-line {
        position: relative;
        bottom: auto;
        left: auto;
        background-color: transparent;
      }
      ::ng-deep .ol-scale-line-inner {
        border-color: currentColor;
        color: inherit;
        font-size: inherit;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalelineComponent implements OnInit, OnDestroy {
  map = input.required<Map>();

  private elementRef = inject(ElementRef);
  private control?: ControlScaleLine;

  ngOnInit() {
    // target: el control se dibuja dentro de este componente, no encima del mapa.
    this.control = new ControlScaleLine({ target: this.elementRef.nativeElement });
    this.map().addControl(this.control);
  }

  ngOnDestroy() {
    if (this.control) {
      this.map().removeControl(this.control);
    }
  }
}
