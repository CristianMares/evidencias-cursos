import express from 'express';
import crypto from 'node:crypto';
import { readJSON } from './utils.mjs';
import { validateMovie, validatePartialMovie } from './schemas/movies.mjs';

const movies = readJSON('./movies.json');
const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// CORS: el navegador bloquea las peticiones a otro origen (otro dominio o puerto)
// salvo que el servidor responda con la cabecera Access-Control-Allow-Origin.
// '*' permite cualquier origen.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Las peticiones con PATCH o DELETE primero mandan un OPTIONS (preflight) preguntando si estan permitidas.
app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

// Recupera todas las peliculas. Con ?genre=action filtra por genero (sin importar mayusculas).
app.get('/movies', (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
});

// :id es un parametro de la ruta, por ejemplo /movies/abc-123.
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Pelicula no encontrada' });
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  // 400 Bad Request: el cliente mando datos invalidos.
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  // Esto no es REST puro porque el estado se guarda en memoria; mas adelante va a una base de datos.
  movies.push(newMovie);

  // 201 Created: devuelve el recurso creado.
  res.status(201).json(newMovie);
});

// PATCH actualiza solo los campos enviados (PUT reemplazaria todo el recurso).
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Pelicula no encontrada' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Pelicula no encontrada' });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Pelicula eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
