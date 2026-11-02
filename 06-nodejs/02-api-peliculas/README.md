# API de películas con Node.js

Práctica de las clases 2 a 5 del curso de Node.js desde cero (midudev): servidor http, Express,
API REST con validación y CORS, arquitectura MVC y base de datos MySQL.

## Qué contiene

| Clase | Tema | Dónde está |
|---|---|---|
| 2 | Servidor con `http` y rutas GET y POST | `servidor-http.mjs` |
| 2 | El mismo servidor con Express y un middleware | `servidor-express.mjs` |
| 2 | Versión propia de `dotenv` | `lib/dotenv.mjs` |
| 3 | API REST de películas, validación con `zod` y CORS | `schemas/`, `api.http`, `web/index.html` |
| 4 | MVC: modelo, controlador, rutas y middleware | `models/`, `controllers/`, `routes/`, `middlewares/` |
| 5 | Inyección de dependencias y modelo con MySQL | `app.mjs`, `models/mysql/`, `database.sql` |

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/movies` | Lista las películas. `?genre=action` filtra por género |
| GET | `/movies/:id` | Devuelve una película (404 si no existe) |
| POST | `/movies` | Crea una película (201) o responde 400 si los datos son inválidos |
| PATCH | `/movies/:id` | Actualiza solo los campos enviados |
| DELETE | `/movies/:id` | Elimina una película |

En `api.http` hay un ejemplo de cada petición (extensión REST Client de VS Code).

## Estructura

```
index.mjs / index-mysql.mjs   elige el modelo y arranca el servidor
app.mjs                       createApp({ movieModel }): configura Express
routes/movies.mjs             rutas de /movies
controllers/movies.mjs        recibe la petición, usa el modelo y responde
models/local-file-system/     modelo con movies.json (datos en memoria)
models/mysql/                 modelo con MySQL
middlewares/cors.mjs          lista blanca de orígenes
schemas/movies.mjs            validación con zod
```

El controlador y el router reciben el modelo al crearse (inyección de dependencias), por eso la misma
aplicación funciona con el archivo JSON o con MySQL sin cambiar nada más.

## Cómo correrlo

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env
npm run dev
```

Se abre en `http://localhost:1234/movies`.

### Con MySQL

Necesita Docker. `docker-compose.yml` crea la base y ejecuta `database.sql` (tablas y datos de ejemplo).

```bash
docker compose up -d
npm run dev:mysql
```

Las credenciales salen de `.env` (copia `.env.example`). Si el puerto 3306 está ocupado, cambia `DB_PORT`.
Para borrar la base: `docker compose down -v`.

## Seguridad con MySQL

- Todas las consultas usan parámetros (`?`): MySQL recibe el valor aparte del SQL y nunca lo ejecuta,
  así que un texto como `' OR '1'='1` no sirve para inyectar código.
- Los nombres de columna no se pueden enviar como parámetro. Por eso `update` solo acepta las columnas
  de una lista fija (`UPDATABLE_COLUMNS`).
- Crear y actualizar usan transacciones: si falla una parte, no se guarda nada.

## CORS

El navegador bloquea las peticiones a otro origen salvo que el servidor lo permita. `middlewares/cors.mjs`
acepta una lista de orígenes (`localhost:8080`, `localhost:4200`...). Para probarlo,
sirve `web/index.html` en el puerto 8080:

```bash
npx serve web -l 8080
```

## Diferencias con el curso

- Los posters son imágenes de relleno (placehold.co), no los de las películas reales.
- El curso usa un servicio de base de datos en la nube; aquí se usa MySQL con Docker para no depender de
  una cuenta externa. El código del modelo es el mismo.
- Express 5 y `zod` 4 (versiones actuales).

## Despliegue

El servidor lee el puerto de la variable `PORT`, que es lo que piden los servicios de hosting.
Comando de arranque: `npm start` (o `npm run start:mysql`). Las credenciales de la base van como variables
de entorno del servicio, nunca en el repositorio. Esta práctica no se desplegó.
