import { MovieModel } from '../models/movie.mjs';
import { validateMovie, validatePartialMovie } from '../schemas/movies.mjs';

// El controlador recibe la peticion, usa el modelo y decide que responder.
export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });

    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Pelicula no encontrada' });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    // 400 Bad Request: el cliente mando datos invalidos.
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
    }

    const newMovie = await MovieModel.create({ input: result.data });

    // 201 Created: devuelve el recurso creado.
    res.status(201).json(newMovie);
  }

  static async update(req, res) {
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
  }

  static async delete(req, res) {
    const { id } = req.params;
    const deleted = await MovieModel.delete({ id });

    if (deleted === false) {
      return res.status(404).json({ message: 'Pelicula no encontrada' });
    }

    return res.json({ message: 'Pelicula eliminada' });
  }
}
