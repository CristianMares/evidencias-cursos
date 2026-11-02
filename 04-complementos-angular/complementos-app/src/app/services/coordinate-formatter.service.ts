import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CoordinateFormatterService {
  // Reemplaza {x} y {y} del template por las coordenadas con la cantidad de decimales pedida.
  numberCoordinates(coordinates: number[], fractionDigits = 0, template = '{x} {y}'): string {
    const digitsInfo = `1.${fractionDigits}-${fractionDigits}`;
    const x = formatNumber(coordinates[0], 'en-US', digitsInfo);
    const y = formatNumber(coordinates[1], 'en-US', digitsInfo);
    return template.replace('{x}', x).replace('{y}', y);
  }
}
