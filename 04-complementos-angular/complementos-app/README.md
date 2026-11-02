# Complementos de Angular

Práctica de los temas que complementan el curso de Angular y que sirven de puente
hacia un sistema con mapas: ciclo de vida de los componentes, formularios reactivos
y OpenLayers dentro de un componente. Proyecto con Angular CLI 21, componentes
standalone, signals y sin zone.js.

## Páginas

| Ruta | Tema | Qué practica |
|---|---|---|
| `/ciclo-de-vida` | Ciclo de vida de componentes | Registro en pantalla de `constructor`, `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`, `ngAfterViewInit`, `afterNextRender`, `ngOnDestroy` y `DestroyRef` |
| `/formulario` | Formularios reactivos | `FormBuilder`, `FormGroup`, validadores, mensajes de error, `patchValue` y `setValue` |
| `/mapa` | OpenLayers en Angular | Mapa dentro de un componente, controles de escala y posición del mouse |

## Fuentes

- Guía oficial de Angular sobre el ciclo de vida de los componentes.
- Video de formularios reactivos (28 días aprendiendo Angular, día 14).
- Video del componente de OpenLayers (Moldeo Interactive).
- Artículo *OpenLayers in an Angular application - Basics* (Camptocamp).

## Qué se hizo en cada tema

**Ciclo de vida.** Un componente hijo escribe en un servicio cada hook que se ejecuta,
y la página lo muestra en una lista. Se puede mostrar y ocultar el hijo para ver
`ngOnDestroy`, y cambiar el texto de un `input()` para ver `ngOnChanges`.
`ngDoCheck` y los hooks `Checked` solo escriben en la consola porque corren muy seguido.

**Formulario reactivo.** El formulario de contacto (nombre, mayor de edad, departamento
y comentario) con validaciones. El botón se bloquea mientras el formulario sea inválido.
`patchValue` cambia solo algunos campos; `setValue` exige todos, si falta uno lanza error.

**Mapa.** Primero se hizo como en el video: un componente con `lat`, `lng` y `zoom`
que crea el mapa en `ngAfterViewInit`. Después se refactorizó al patrón del artículo:
la página crea el mapa y `MapComponent` solo lo dibuja. Así los controles
(`app-scaleline` y `app-mouse-position`) reciben el mismo mapa y se agregan solo
si están en la plantilla. Al salir de la página, el mapa y los controles se sueltan.
`::ng-deep` se usa porque OpenLayers crea su HTML sin los atributos de Angular.

## Cómo correrlo

Requiere Node.js.

```bash
npm install
npm start
```

Se abre en `http://localhost:4200`. El mapa necesita internet para cargar los mosaicos de OpenStreetMap.
