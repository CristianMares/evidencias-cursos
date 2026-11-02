import { validateMovie, validatePartialMovie } from '../schemas/movies.mjs';

// El controlador ya no importa un modelo concreto: lo recibe al crearse (inyeccion de dependencias).
// Asi funciona igual con un archivo JSON, con MySQL o con un modelo falso para pruebas.
export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  // Se usan funciones flecha como propiedades para que "this" siga apuntando al controlador.
  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre });
    res.json(movies);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });

    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Pelicula no encontrada' });
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);

    // 400 Bad Request: el cliente mando datos invalidos.
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
    }

    const newMovie = await this.movieModel.create({ input: result.data });

    // 201 Created: devuelve el recurso creado.
    res.status(201).json(newMovie);
  };

  update = async (req, res) => {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
    }

    const { id } = req.params;
    const updatedMovie = await this.movieModel.update({ id, input: result.data });

    if (updatedMovie === false) {
      return res.status(404).json({ message: 'Pelicula no encontrada' });
    }

    return res.json(updatedMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deleted = await this.movieModel.delete({ id });

    if (deleted === false) {
      return res.status(404).json({ message: 'Pelicula no encontrada' });
    }

    return res.json({ message: 'Pelicula eliminada' });
  };
}
