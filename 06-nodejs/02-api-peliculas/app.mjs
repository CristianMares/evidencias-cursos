import express from 'express';
import cors from 'cors';
import { MovieModel } from './models/movie.mjs';
import { validateMovie, validatePartialMovie } from './schemas/movies.mjs';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// CORS: el paquete cors responde las cabeceras y los preflight (OPTIONS) por nosotros.
// origin recibe el origen de la peticion y decide si se permite.
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:4200', 'https://movies.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Sin origin: peticiones del mismo origen o de herramientas como curl.
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

// Recupera todas las peliculas. Con ?genre=action filtra por genero (sin importar mayusculas).
app.get('/movies', async (req, res) => {
  const { genre } = req.query;
  const movies = await MovieModel.getAll({ genre });
  res.json(movies);
});

// :id es un parametro de la ruta, por ejemplo /movies/abc-123.
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getById({ id });

  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Pelicula no encontrada' });
});

app.post('/movies', async (req, res) => {
  const result = validateMovie(req.body);

  // 400 Bad Request: el cliente mando datos invalidos.
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
  }

  const newMovie = await MovieModel.create({ input: result.data });

  // 201 Created: devuelve el recurso creado.
  res.status(201).json(newMovie);
});

// PATCH actualiza solo los campos enviados (PUT reemplazaria todo el recurso).
app.patch('/movies/:id', async (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
  }

  const { id } = req.params;
  const updatedMovie = await MovieModel.update({ id, input: result.data });

  if (updatedMovie === false) {
    return res.status(404).json({ message: 'Pelicula no encontrada' });
  }

  return res.json(updatedMovie);
});

app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await MovieModel.delete({ id });

  if (deleted === false) {
    return res.status(404).json({ message: 'Pelicula no encontrada' });
  }

  return res.json({ message: 'Pelicula eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
