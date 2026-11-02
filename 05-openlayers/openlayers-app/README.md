# Práctica de OpenLayers

Práctica del curso *OpenLayers 9* (videos 01 al 13, 16 y 17). El curso se hace con JavaScript puro;
aquí cada tema se practicó dentro de una aplicación Angular 21 (componentes standalone, signals y sin zone.js),
que es donde se va a usar después. La librería instalada es OpenLayers 10.

## Páginas

| Ruta | Videos | Qué practica |
|---|---|---|
| `/vista-de-inicio` | 03 | `Map`, `View`, centro con `fromLonLat`, zoom, proyección EPSG:3857, extensión y límites de zoom |
| `/controles` | 04 y 05 | Controles por defecto traducidos, pantalla completa, posición del mouse (con formato y fuera del mapa), escala y zoom a la extensión inicial |
| `/raster` | 06 | Capas de mosaicos (`TileLayer`) con OSM y fuentes `XYZ`, atribuciones |
| `/vectores` | 07 | Archivo GeoJSON con `VectorSource` y `VectorLayer`, atributos al hacer clic y rango de zoom por capa |
| `/interacciones` | 08, 09 y 10 | Dibujar puntos, líneas y polígonos, modificar, eliminar, limpiar y descargar un GeoJSON |
| `/estilos` | 11, 12 y 13 | `Style`, `Stroke`, `Fill`, círculo, formas regulares, iconos y estilos mediante funciones (por geometría y por propiedades) |
| `/layer-switcher` | 16 y 17 | Librería ol-ext: `LayerSwitcher` con capas base y capas temáticas (manzanas, predios y vías) con estilos y etiquetas |

Los videos 14, 15 y 18 (controles personalizados y búsqueda) eran opcionales y no se incluyeron.

## Cómo está organizado

- Cada página crea su mapa y se lo pasa a `MapComponent`, un componente que solo lo dibuja
  (el mismo patrón de la práctica de complementos de Angular).
- `src/app/shared/la-paz.ts` guarda la ubicación de los ejemplos. OpenLayers trabaja en EPSG:3857 (metros);
  las coordenadas en longitud y latitud (EPSG:4326) se convierten con `fromLonLat`.
- `public/data/` tiene los GeoJSON de ejemplo. Los de Bolivia son aproximados y los de manzanas, predios y vías
  están inventados para practicar; no son datos reales.
- `src/ol-ext.d.ts` declara los tipos mínimos de ol-ext, que viene en JavaScript sin tipos.

## Diferencias con el curso

- El curso usa mosaicos de Google. Aquí se usan OpenStreetMap, OpenTopoMap y Esri (imágenes satelitales),
  con su atribución visible, para no depender de un servicio que no permite ese uso.
- Los iconos de los puntos son SVG incluidos en el propio código en vez de archivos PNG descargados.
- Las propiedades `title` y `baseLayer` que lee el selector de capas se pasan con `properties`,
  porque TypeScript no acepta propiedades extra en las opciones de la capa.

## Cómo correrlo

Requiere Node.js e internet (para los mosaicos del mapa).

```bash
npm install
npm start
```

Se abre en `http://localhost:4200`.
