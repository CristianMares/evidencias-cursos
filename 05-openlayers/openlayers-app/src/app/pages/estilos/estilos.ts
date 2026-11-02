import { StyleLike } from 'ol/style/Style';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// Un solo Style se aplica igual a todos los objetos de la capa.
// stroke: borde de poligonos y color de las lineas. fill: relleno. image: forma de los puntos.
export const estiloFijo = new Style({
  stroke: new Stroke({ color: '#2e7d32', width: 4 }),
  fill: new Fill({ color: 'rgba(46, 125, 50, 0.3)' }),
  // Los puntos no usan stroke ni fill directamente: necesitan una imagen (aqui, un circulo).
  image: new CircleStyle({
    radius: 8,
    stroke: new Stroke({ color: '#2e7d32', width: 4 }),
    fill: new Fill({ color: 'rgba(46, 125, 50, 0.5)' }),
  }),
});

export type Modo = 'defecto' | 'fijo';

export const MODOS: { id: Modo; nombre: string; estilo: StyleLike | undefined }[] = [
  { id: 'defecto', nombre: 'Estilo por defecto', estilo: undefined },
  { id: 'fijo', nombre: 'Estilo fijo (borde, relleno y circulo)', estilo: estiloFijo },
];
