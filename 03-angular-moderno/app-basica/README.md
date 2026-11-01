# App básica de Angular

Práctica de las secciones 4 y 5 del curso *Angular moderno: de cero a experto*
(Fernando Herrera). Proyecto creado con Angular CLI 21, componentes standalone y
detección de cambios sin zone.js (zoneless).

## Páginas

| Ruta | Página | Qué practica |
|---|---|---|
| `/` | Counter | Componente, `templateUrl` y `styleUrl`, signals (`signal`, `set`, `update`) |
| `/hero` | Hero | Signals y señales computadas (`computed`) |
| `/dragonball` | Dragon Ball | `@for`, `@if`, `ngClass`, formulario con signals |
| `/dragonball-super` | Dragon Ball Super | La misma pantalla separada en componentes: `input()`, `output()` y un servicio |

## Tareas del curso que incluye

- **Counter**: botones de restar y reset, con el template en su propio archivo `.html`.
- **Hero**: nombre y edad con signals, cambiar héroe, cambiar edad, reset y nombre en mayúsculas con una señal computada.
- **Dragon Ball**: página nueva con su ruta y su enlace en el navbar.
- **Lista de personajes**: nuevo `input` llamado `listName` que se muestra como título.
- **Agregar personaje**: componente aparte que avisa al padre con `output()`.

## Conceptos

- `signal()` guarda un valor que Angular vigila; se lee con `()` y se cambia con `set` o `update`.
- `computed()` calcula un valor a partir de otras señales y se actualiza solo.
- `input()` recibe datos del componente padre; `output()` le avisa algo al padre.
- `DragonballService` guarda el estado de los personajes, así lo comparten los componentes.
- `effect()` guarda los personajes en LocalStorage cada vez que cambian, y al iniciar
  se leen de ahí, así no se pierden al recargar.

## Cómo correrlo

Requiere Node.js.

```bash
npm install
npm start
```

Se abre en `http://localhost:4200`.
