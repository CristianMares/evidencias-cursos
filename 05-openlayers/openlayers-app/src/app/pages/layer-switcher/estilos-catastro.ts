import { FeatureLike } from 'ol/Feature';
import { Fill, Stroke, Style, Text } from 'ol/style';

// Las etiquetas solo se ven cuando el mapa esta cerca (resolucion = metros por pixel).
const RESOLUCION_ETIQUETAS = 2;

const texto = (valor: string, resolucion: number, color = '#000') =>
  resolucion < RESOLUCION_ETIQUETAS
    ? new Text({ text: valor, font: '11px sans-serif', fill: new Fill({ color }), stroke: new Stroke({ color: '#fff', width: 3 }) })
    : undefined;

// Cada funcion recibe el objeto y la resolucion; lee sus propiedades con feature.get('nombre').
export const estiloManzanas = (feature: FeatureLike, resolucion: number): Style =>
  new Style({
    stroke: new Stroke({ color: '#6a1b9a', width: 2 }),
    fill: new Fill({ color: 'rgba(106, 27, 154, 0.08)' }),
    text: texto(feature.get('cod_manz'), resolucion, '#6a1b9a'),
  });

export const estiloPredios = (feature: FeatureLike, resolucion: number): Style =>
  new Style({
    stroke: new Stroke({ color: 'rgba(0, 105, 92, 0.8)', width: 1 }),
    fill: new Fill({ color: 'rgba(0, 105, 92, 0.12)' }),
    text: resolucion < 0.8 ? texto(feature.get('cpr'), resolucion, '#00695c') : undefined,
  });

export const estiloVias = (feature: FeatureLike, resolucion: number): Style => {
  const esAvenida = feature.get('tipo') === 'avenida';
  return new Style({
    stroke: new Stroke({ color: esAvenida ? '#37474f' : '#78909c', width: esAvenida ? 4 : 2 }),
    text: texto(feature.get('nombre'), resolucion),
  });
};
