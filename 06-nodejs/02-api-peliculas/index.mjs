import { loadEnv } from './lib/dotenv.mjs';
import { createApp } from './app.mjs';
import { MovieModel } from './models/local-file-system/movie.mjs';

loadEnv();

const PORT = process.env.PORT ?? 1234;

// Aqui se elige el modelo: archivo JSON en memoria.
const app = createApp({ movieModel: MovieModel });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT} (modelo: archivo JSON)`);
});
