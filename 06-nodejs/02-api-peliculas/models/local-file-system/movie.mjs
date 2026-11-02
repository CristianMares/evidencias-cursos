import crypto from 'node:crypto';
import { readJSON } from '../../utils.mjs';

const movies = readJSON('./movies.json');

// El modelo es la unica parte que sabe de donde vienen los datos (aqui, un archivo JSON en memoria).
// Todos los metodos son async para poder cambiar despues a una base de datos sin tocar el resto.
export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
    }

    return movies;
  }

  static async getById({ id }) {
    return movies.find((movie) => movie.id === id) ?? null;
  }

  static async create({ input }) {
    const newMovie = {
      id: crypto.randomUUID(), // uuid v4
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }
}
