import express from 'express';
import { createMovieRouter } from './routes/movies.mjs';
import { corsMiddleware } from './middlewares/cors.mjs';

// createApp recibe el modelo: la aplicacion no sabe de donde salen los datos.
export const createApp = ({ movieModel }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(corsMiddleware());

  app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo' });
  });

  // Todas las rutas que empiezan con /movies las atiende el router.
  app.use('/movies', createMovieRouter({ movieModel }));

  return app;
};
