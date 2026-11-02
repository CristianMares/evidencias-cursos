import crypto from 'node:crypto';
import mysql from 'mysql2/promise';

// La configuracion se lee cuando se usa por primera vez, asi da tiempo a cargar el archivo .env.
const getConfig = () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'moviesdb',
  // Sin esto, los DECIMAL (como rate) llegan como texto ("9.3") en lugar de numero.
  decimalNumbers: true,
});

// Un pool reutiliza varias conexiones en vez de abrir una por consulta.
let pool;
const getPool = () => (pool ??= mysql.createPool(getConfig()));

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Columnas que se pueden actualizar. Los nombres de columna no se pueden enviar como parametro (?),
// por eso solo se aceptan los de esta lista y nunca texto que venga del usuario.
const UPDATABLE_COLUMNS = ['title', 'year', 'director', 'duration', 'poster', 'rate'];

const SELECT_MOVIE = `
  SELECT BIN_TO_UUID(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate,
    (SELECT JSON_ARRAYAGG(g.name)
       FROM movie_genres mg JOIN genre g ON g.id = mg.genre_id
      WHERE mg.movie_id = m.id) AS genre
    FROM movie m`;

// Si una pelicula no tiene generos, JSON_ARRAYAGG devuelve NULL: se cambia por una lista vacia.
const toMovie = (row) => ({
  ...row,
  genre: typeof row.genre === 'string' ? JSON.parse(row.genre) : (row.genre ?? []),
});

export class MovieModel {
  static async getAll({ genre }) {
    const db = getPool();

    if (genre) {
      // Los valores van en ? (consulta preparada): MySQL nunca los interpreta como SQL.
      const [rows] = await db.execute(
        `${SELECT_MOVIE}
          WHERE m.id IN (
            SELECT mg.movie_id FROM movie_genres mg
              JOIN genre g ON g.id = mg.genre_id
             WHERE LOWER(g.name) = ?)`,
        [genre.toLowerCase()],
      );
      return rows.map(toMovie);
    }

    const [rows] = await db.execute(SELECT_MOVIE);
    return rows.map(toMovie);
  }

  static async getById({ id }) {
    if (!UUID_REGEX.test(id)) return null;

    const [rows] = await getPool().execute(`${SELECT_MOVIE} WHERE m.id = UUID_TO_BIN(?)`, [id]);
    return rows.length ? toMovie(rows[0]) : null;
  }

  static async create({ input }) {
    const { genre: genreInput, title, year, director, duration, poster, rate } = input;
    const id = crypto.randomUUID();
    const connection = await getPool().getConnection();

    try {
      // Transaccion: o se guarda la pelicula con todos sus generos o no se guarda nada.
      await connection.beginTransaction();

      await connection.execute(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
        [id, title, year, director, duration, poster, rate],
      );

      for (const name of genreInput) {
        await connection.execute(
          `INSERT INTO movie_genres (movie_id, genre_id)
           VALUES (UUID_TO_BIN(?), (SELECT id FROM genre WHERE name = ?))`,
          [id, name],
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    return MovieModel.getById({ id });
  }

  static async delete({ id }) {
    if (!UUID_REGEX.test(id)) return false;

    // movie_genres tiene ON DELETE CASCADE: sus filas se borran solas.
    const [result] = await getPool().execute('DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]);
    return result.affectedRows > 0;
  }

  static async update({ id, input }) {
    if (!UUID_REGEX.test(id)) return false;

    const { genre: genreInput, ...columns } = input;
    const entries = Object.entries(columns).filter(([key]) => UPDATABLE_COLUMNS.includes(key));

    const connection = await getPool().getConnection();

    try {
      await connection.beginTransaction();

      if (entries.length > 0) {
        const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
        const values = entries.map(([, value]) => value);
        await connection.execute(`UPDATE movie SET ${setClause} WHERE id = UUID_TO_BIN(?)`, [...values, id]);
      }

      if (genreInput) {
        await connection.execute('DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)', [id]);
        for (const name of genreInput) {
          await connection.execute(
            `INSERT INTO movie_genres (movie_id, genre_id)
             VALUES (UUID_TO_BIN(?), (SELECT id FROM genre WHERE name = ?))`,
            [id, name],
          );
        }
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    const movie = await MovieModel.getById({ id });
    return movie ?? false;
  }
}
