import express from 'express';
import { readJSON } from './utils.mjs';

const movies = readJSON('./movies.json');
const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
