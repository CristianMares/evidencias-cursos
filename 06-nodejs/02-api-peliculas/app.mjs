import express from 'express';
import { moviesRouter } from './routes/movies.mjs';
import { corsMiddleware } from './middlewares/cors.mjs';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(corsMiddleware());

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

// Todas las rutas que empiezan con /movies las atiende el router.
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
