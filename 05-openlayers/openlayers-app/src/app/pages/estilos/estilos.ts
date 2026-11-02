import { FeatureLike } from 'ol/Feature';
import { StyleLike } from 'ol/style/Style';
import { Circle as CircleStyle, Fill, Icon, RegularShape, Stroke, Style, Text } from 'ol/style';

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

// Funcion de estilo: OpenLayers la llama una vez por cada objeto (feature) y usa el Style que devuelva.
// Aqui se diferencia por el tipo de geometria (en el curso se convierte a JSON; getType() lo da directo).
export const estiloPorGeometria = (feature: FeatureLike): Style => {
  const tipo = feature.getGeometry()?.getType();

  switch (tipo) {
    case 'Point':
      return new Style({
        image: new Icon({ src: `data:image/svg+xml;charset=utf-8,${svgArbol}`, width: 32, height: 32 }),
        text: new Text({ text: 'Punto', offsetY: 24, font: 'bold 12px sans-serif' }),
      });
    case 'LineString':
      return new Style({
        stroke: new Stroke({ color: '#c62828', width: 5 }),
        text: new Text({ text: 'Linea', font: 'bold 12px sans-serif', placement: 'line' }),
      });
    default:
      return new Style({
        stroke: new Stroke({ color: '#2e7d32', width: 3 }),
        fill: new Fill({ color: 'rgba(46, 125, 50, 0.4)' }),
        text: new Text({ text: 'Poligono', font: 'bold 12px sans-serif' }),
      });
  }
};

// Mejor aun: usar las propiedades del objeto (sus atributos) para decidir el estilo.
const COLORES_USO: Record<string, string> = {
  parque: '46, 125, 50',
  comercial: '198, 40, 40',
  residencial: '21, 101, 192',
};

export const estiloPorPropiedad = (feature: FeatureLike): Style => {
  const nombre = feature.get('nombre') as string;
  const tipoGeometria = feature.getGeometry()?.getType();

  if (tipoGeometria === 'Point') {
    return new Style({
      image: new CircleStyle({
        radius: 9,
        stroke: new Stroke({ color: '#ffffff', width: 2 }),
        fill: new Fill({ color: feature.get('tipo') === 'estadio' ? '#ef6c00' : '#6a1b9a' }),
      }),
      text: new Text({ text: nombre, offsetY: -18, font: 'bold 12px sans-serif', stroke: new Stroke({ color: '#fff', width: 3 }) }),
    });
  }

  if (tipoGeometria === 'LineString') {
    // Las avenidas son mas gruesas y oscuras que las calles.
    const esAvenida = feature.get('tipo') === 'avenida';
    return new Style({
      stroke: new Stroke({ color: esAvenida ? '#37474f' : '#90a4ae', width: esAvenida ? 7 : 3 }),
      text: new Text({ text: nombre, font: '12px sans-serif', placement: 'line', stroke: new Stroke({ color: '#fff', width: 3 }) }),
    });
  }

  const rgb = COLORES_USO[feature.get('uso') as string] ?? '120, 120, 120';
  return new Style({
    stroke: new Stroke({ color: `rgb(${rgb})`, width: 2 }),
    fill: new Fill({ color: `rgba(${rgb}, 0.35)` }),
    text: new Text({ text: nombre, font: 'bold 12px sans-serif', stroke: new Stroke({ color: '#fff', width: 3 }) }),
  });
};

export type Modo = 'defecto' | 'fijo' | 'formas' | 'iconos' | 'geometria' | 'propiedad';

export const MODOS: { id: Modo; nombre: string; estilo: StyleLike | undefined }[] = [
  { id: 'defecto', nombre: 'Estilo por defecto', estilo: undefined },
  { id: 'fijo', nombre: 'Estilo fijo (borde, relleno y circulo)', estilo: estiloFijo },
  { id: 'formas', nombre: 'Formas regulares (triangulo)', estilo: estiloFormas },
  { id: 'iconos', nombre: 'Iconos', estilo: estiloIconos },
  { id: 'geometria', nombre: 'Funcion: segun la geometria', estilo: estiloPorGeometria },
  { id: 'propiedad', nombre: 'Funcion: segun las propiedades', estilo: estiloPorPropiedad },
];
