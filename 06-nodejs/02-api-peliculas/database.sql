-- Esquema y datos de ejemplo de la base de datos de peliculas (MySQL 8).
-- Docker lo ejecuta solo la primera vez que crea la base (ver docker-compose.yml).

CREATE DATABASE IF NOT EXISTS moviesdb;
USE moviesdb;

-- id es un UUID guardado en 16 bytes (BINARY(16)): ocupa menos que el texto de 36 caracteres.
-- Se convierte con UUID_TO_BIN() al guardar y con BIN_TO_UUID() al leer.
CREATE TABLE movie (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  poster TEXT,
  rate DECIMAL(3, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

-- Relacion muchos a muchos: una pelicula tiene varios generos y un genero muchas peliculas.
CREATE TABLE movie_genres (
  movie_id BINARY(16) NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genre (id)
);

INSERT INTO genre (name) VALUES
  ('Action'),
  ('Adventure'),
  ('Animation'),
  ('Biography'),
  ('Crime'),
  ('Drama'),
  ('Fantasy'),
  ('History'),
  ('Horror'),
  ('Romance'),
  ('Sci-Fi'),
  ('Thriller');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
  (UUID_TO_BIN('dd8fb28c-d0c5-4f39-a21b-1ee3d8828f38'), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://placehold.co/300x450?text=The%20Shawshank%20Redemption', 9.3),
  (UUID_TO_BIN('0ad6928d-ade7-4a9d-a464-858004282ab9'), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://placehold.co/300x450?text=The%20Dark%20Knight', 9),
  (UUID_TO_BIN('0d0d9b94-2afd-4ac7-a11d-28ddad80176c'), 'Inception', 2010, 'Christopher Nolan', 148, 'https://placehold.co/300x450?text=Inception', 8.8),
  (UUID_TO_BIN('9655de7a-f2e1-4aa4-aa4f-b6d5b27531ad'), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://placehold.co/300x450?text=Pulp%20Fiction', 8.9),
  (UUID_TO_BIN('b001e13c-4c80-4b7d-a85c-3b7e11115c3c'), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://placehold.co/300x450?text=Forrest%20Gump', 8.8),
  (UUID_TO_BIN('9b7fdcb8-8363-431b-a0e1-4f4668cd06f6'), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://placehold.co/300x450?text=Gladiator', 8.5),
  (UUID_TO_BIN('cabc724c-80ff-41ec-aa3a-11e30386ef9a'), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://placehold.co/300x450?text=The%20Matrix', 8.7),
  (UUID_TO_BIN('0a084f32-7dcb-49d9-a808-ac55858b97a8'), 'Schindler''s List', 1993, 'Steven Spielberg', 195, 'https://placehold.co/300x450?text=Schindler''s%20List', 8.9),
  (UUID_TO_BIN('70c77be6-db51-4638-a00e-793c886188c7'), 'The Godfather', 1972, 'Francis Ford Coppola', 175, 'https://placehold.co/300x450?text=The%20Godfather', 9.2),
  (UUID_TO_BIN('02fc8787-08f8-4520-ac92-89a81e8f7a42'), 'Fight Club', 1999, 'David Fincher', 139, 'https://placehold.co/300x450?text=Fight%20Club', 8.8);

INSERT INTO movie_genres (movie_id, genre_id) VALUES
  (UUID_TO_BIN('dd8fb28c-d0c5-4f39-a21b-1ee3d8828f38'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('0ad6928d-ade7-4a9d-a464-858004282ab9'), (SELECT id FROM genre WHERE name = 'Action')),
  (UUID_TO_BIN('0ad6928d-ade7-4a9d-a464-858004282ab9'), (SELECT id FROM genre WHERE name = 'Crime')),
  (UUID_TO_BIN('0ad6928d-ade7-4a9d-a464-858004282ab9'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('0d0d9b94-2afd-4ac7-a11d-28ddad80176c'), (SELECT id FROM genre WHERE name = 'Action')),
  (UUID_TO_BIN('0d0d9b94-2afd-4ac7-a11d-28ddad80176c'), (SELECT id FROM genre WHERE name = 'Adventure')),
  (UUID_TO_BIN('0d0d9b94-2afd-4ac7-a11d-28ddad80176c'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
  (UUID_TO_BIN('9655de7a-f2e1-4aa4-aa4f-b6d5b27531ad'), (SELECT id FROM genre WHERE name = 'Crime')),
  (UUID_TO_BIN('9655de7a-f2e1-4aa4-aa4f-b6d5b27531ad'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('b001e13c-4c80-4b7d-a85c-3b7e11115c3c'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('b001e13c-4c80-4b7d-a85c-3b7e11115c3c'), (SELECT id FROM genre WHERE name = 'Romance')),
  (UUID_TO_BIN('9b7fdcb8-8363-431b-a0e1-4f4668cd06f6'), (SELECT id FROM genre WHERE name = 'Action')),
  (UUID_TO_BIN('9b7fdcb8-8363-431b-a0e1-4f4668cd06f6'), (SELECT id FROM genre WHERE name = 'Adventure')),
  (UUID_TO_BIN('9b7fdcb8-8363-431b-a0e1-4f4668cd06f6'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('cabc724c-80ff-41ec-aa3a-11e30386ef9a'), (SELECT id FROM genre WHERE name = 'Action')),
  (UUID_TO_BIN('cabc724c-80ff-41ec-aa3a-11e30386ef9a'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
  (UUID_TO_BIN('0a084f32-7dcb-49d9-a808-ac55858b97a8'), (SELECT id FROM genre WHERE name = 'Biography')),
  (UUID_TO_BIN('0a084f32-7dcb-49d9-a808-ac55858b97a8'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('0a084f32-7dcb-49d9-a808-ac55858b97a8'), (SELECT id FROM genre WHERE name = 'History')),
  (UUID_TO_BIN('70c77be6-db51-4638-a00e-793c886188c7'), (SELECT id FROM genre WHERE name = 'Crime')),
  (UUID_TO_BIN('70c77be6-db51-4638-a00e-793c886188c7'), (SELECT id FROM genre WHERE name = 'Drama')),
  (UUID_TO_BIN('02fc8787-08f8-4520-ac92-89a81e8f7a42'), (SELECT id FROM genre WHERE name = 'Drama'));
