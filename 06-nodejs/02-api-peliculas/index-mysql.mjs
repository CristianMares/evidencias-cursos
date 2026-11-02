import { loadEnv } from './lib/dotenv.mjs';
import { createApp } from './app.mjs';
import { MovieModel } from './models/mysql/movie.mjs';

loadEnv();

const PORT = process.env.PORT ?? 1234;

// Misma aplicacion que index.mjs, pero con el modelo que usa MySQL.
const app = createApp({ movieModel: MovieModel });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT} (modelo: MySQL)`);
});
