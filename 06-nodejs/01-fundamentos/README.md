# Fundamentos de Node.js

Práctica del video *Curso de Node.js desde cero: introducción y primeros pasos* (midudev).

## Qué contiene

| Archivo | Tema |
|---|---|
| `modulos/commonjs/` | Módulos con CommonJS (`module.exports` y `require`) |
| `modulos/esm/` | Módulos con ES Modules (`export`, `import` y exportación por defecto) |
| `os-info.mjs` | Módulo `os`: sistema, CPUs y memoria |
| `fs-sync.mjs` | Leer archivos de forma síncrona con `fs` |
| `fs-callback.mjs` | Leer archivos con callbacks |
| `fs-promises.mjs` | Leer archivos con promesas, `async/await` y `promisify` |
| `fs-paralelo.mjs` | Leer varios archivos a la vez con `Promise.all` |
| `path.mjs` | Módulo `path`: `join`, `basename`, `extname` y `sep` |
| `process.mjs` | Objeto `process`: `argv`, `cwd`, `env`, `exit` y evento `exit` |
| `ls-basico.mjs` y `ls.mjs` | Comando `ls` propio: `readdir`, `stat` y colores con `picocolors` |
| `servidor-http.mjs` | Servidor con `http`: rutas, cabeceras, códigos de estado e imagen |
| `find-free-port.mjs` | Módulo `net` para buscar un puerto libre |

## Cómo correrlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run esm
node ls.mjs ./archivos
npm run servidor
```

Con el servidor encendido se pueden probar `/`, `/imagen`, `/contacto` y una ruta que no existe (404).
