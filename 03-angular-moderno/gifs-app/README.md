# GifsApp

Práctica de las secciones 6 y 7 del curso *Angular moderno: de cero a experto*
(Fernando Herrera). Buscador de gifs con la API de Giphy, hecho con Angular CLI 21,
componentes standalone, signals y Tailwind CSS.

## Qué hace

- **Trending**: muestra los gifs populares que trae de Giphy.
- **Buscador**: busca gifs por texto (Enter o botón).
- **Historial**: cada búsqueda se guarda con sus resultados. Aparece en el menú lateral
  y se abre en una URL como `/dashboard/history/goku`, sin volver a pedir los datos.
- El historial se mantiene al recargar la página (LocalStorage).

## Estructura

```
src/app/gifs/
├── components/   side-menu (header y opciones), gif-list y gif-list-item
├── interfaces/   forma de la respuesta de Giphy y del Gif de la app
├── mapper/       convierte la respuesta de Giphy en un Gif
├── pages/        dashboard (layout), trending, search e history
└── services/     GifService: peticiones HTTP, historial y LocalStorage
```

## Conceptos practicados

- Rutas hijas y `loadComponent` (carga perezosa de páginas).
- `routerLink` y `routerLinkActive` desde componentes hijos.
- Environments (`environment.ts`) y path alias (`@environments`, `@gifs`).
- `input()` para pasar datos entre componentes.
- `HttpClient` con `provideHttpClient()`, parámetros y `pipe(map, tap)`.
- Signals en un servicio: `signal`, `computed` y `effect`.
- Parámetros dinámicos de URL (`history/:query`) con `toSignal`.
- LocalStorage para guardar y cargar el historial.

## Cómo correrlo

Requiere Node.js y una API key gratuita de Giphy (developers.giphy.com → Create an App → API).

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Pega tu key en `src/environments/environment.development.ts`
   (`giphyApiKey`). No la subas al repositorio.

3. Inicia la app:

   ```bash
   npm start
   ```

Se abre en `http://localhost:4200`.
