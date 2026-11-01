# TypeScript desde cero

Curso: *TypeScript desde cero, primeros pasos* (MoureDev, "Un día un lenguaje").
Fecha de estudio: 27 de octubre de 2026.

## Qué practiqué

Un archivo por tema, siguiendo el orden del curso:

| Archivo | Tema |
|---|---|
| `src/01-hola-mundo.ts` | Hola mundo y comentarios |
| `src/02-variables-y-tipos.ts` | `let`, `const`, inferencia de tipos y tipos primitivos |
| `src/03-control-de-flujo.ts` | `if / else if / else`, `&&` y `\|\|` |
| `src/04-funciones.ts` | Funciones con parámetros y retorno tipados |
| `src/05-estructuras.ts` | `Array`, `Set` y `Map` |
| `src/06-bucles.ts` | `for...of`, `while` y `forEach` |
| `src/07-clases-y-enums.ts` | Clases con constructor y `enum` |
| `src/gestor-tareas.ts` | Mini proyecto que junta todo lo anterior |

Los ejemplos que no compilan están comentados con el error que daría
el compilador.

## Cómo correrlo

Requiere Node.js.

```bash
npm install
npm run check      # revisa los tipos con tsc
npm run hola       # ejecuta un archivo
npm run tareas     # ejecuta el mini proyecto
```

`tsconfig.json` se generó con `npx tsc --init` y se ajustó para este proyecto.
