import { StyleLike } from 'ol/style/Style';
import { Circle as CircleStyle, Fill, Icon, RegularShape, Stroke, Style } from 'ol/style';

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

// RegularShape dibuja figuras regulares: points = numero de vertices (3 triangulo, 4 cuadrado...).
export const estiloFormas = new Style({
  stroke: new Stroke({ color: '#ef6c00', width: 4 }),
  fill: new Fill({ color: 'rgba(239, 108, 0, 0.3)' }),
  image: new RegularShape({
    points: 3,
    radius: 12,
    rotation: (35 * Math.PI) / 180,
    stroke: new Stroke({ color: '#ef6c00', width: 3 }),
    fill: new Fill({ color: 'rgba(239, 108, 0, 0.5)' }),
  }),
});

// Icon usa una imagen. Aqui es un SVG dentro de la propia URL (data:), asi no hace falta un archivo.
const svgArbol = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">' +
    '<circle cx="16" cy="12" r="10" fill="#2e7d32"/>' +
    '<rect x="14" y="20" width="4" height="10" fill="#6d4c41"/>' +
    '</svg>',
);

export const estiloIconos = new Style({
  stroke: new Stroke({ color: '#1565c0', width: 4 }),
  fill: new Fill({ color: 'rgba(21, 101, 192, 0.3)' }),
  image: new Icon({ src: `data:image/svg+xml;charset=utf-8,${svgArbol}`, width: 32, height: 32 }),
});

export type Modo = 'defecto' | 'fijo' | 'formas' | 'iconos';

export const MODOS: { id: Modo; nombre: string; estilo: StyleLike | undefined }[] = [
  { id: 'defecto', nombre: 'Estilo por defecto', estilo: undefined },
  { id: 'fijo', nombre: 'Estilo fijo (borde, relleno y circulo)', estilo: estiloFijo },
  { id: 'formas', nombre: 'Formas regulares (triangulo)', estilo: estiloFormas },
  { id: 'iconos', nombre: 'Iconos', estilo: estiloIconos },
];
